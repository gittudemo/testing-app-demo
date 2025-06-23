import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentsService } from '../../services/comments.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Mock CommentsService
class MockCommentsService {
  getAllComments = jasmine.createSpy().and.returnValue(of([{ id: 1, text: 'Test comment' }]));
  postComment = jasmine.createSpy().and.returnValue(of({ id: 2, text: 'New comment' }));
}

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentsService: MockCommentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [
        { provide: CommentsService, useClass: MockCommentsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    commentsService = TestBed.inject(CommentsService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadComments on init', () => {
    spyOn(component, 'loadComments');
    component.ngOnInit();
    expect(component.loadComments).toHaveBeenCalled();
  });

  it('should load comments and populate allComments', () => {
    component.loadComments();
    expect(commentsService.getAllComments).toHaveBeenCalled();
    expect(component.allComments.length).toBeGreaterThan(0);
    expect(component.allComments[0].text).toBe('Test comment');
  });

  it('should update text on handleChange', () => {
    const event = { target: { value: 'Hello' } } as any;
    component.handleChange(event);
    expect(component.text).toBe('Hello');
  });

  it('should alert if handleSubmit called with empty text', () => {
    spyOn(window, 'alert');
    component.text = '';
    component.handleSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please add a comment');
    expect(commentsService.postComment).not.toHaveBeenCalled();
  });

  it('should post comment and add to allComments if text is not empty', () => {
    component.text = 'New comment';
    component.handleSubmit();
    expect(commentsService.postComment).toHaveBeenCalledWith(jasmine.objectContaining({ text: 'New comment' }));
    expect(component.allComments.some(c => c.text === 'New comment')).toBeTrue();
    expect(component.text).toBe('');
  });

  it('should render the correct number of comments in the template', () => {
    component.allComments = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' }
    ];
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('ul li'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('Comment 1');
    expect(items[1].nativeElement.textContent).toContain('Comment 2');
  });

  it('should bind input value to text', () => {
    component.text = 'Bound value';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('Bound value');
  });
});
