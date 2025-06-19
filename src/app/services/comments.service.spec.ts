import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { API_URL } from '../utils/resources';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all comments', () => {
    const dummyComments = [{ id: 1, text: 'Test comment' }];
    service.getAllComments().subscribe(comments => {
      expect(comments).toEqual(dummyComments);
    });
    const req = httpMock.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should fetch a comment by id', () => {
    const dummyComment = { id: 1, text: 'Test comment' };
    service.getCommentById(1).subscribe(comment => {
      expect(comment).toEqual(dummyComment);
    });
    const req = httpMock.expectOne(`${API_URL}/comments/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComment);
  });

  it('should post a comment', () => {
    const payload = { id: 2, text: 'New comment' };
    service.postComment(payload).subscribe(response => {
      expect(response).toEqual(payload);
    });
    const req = httpMock.expectOne(`${API_URL}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(payload);
  });
});
