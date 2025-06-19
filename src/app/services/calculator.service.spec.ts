import { CalculatorService } from "./calculator.service";
import { TestBed } from '@angular/core/testing';

describe("calculator service", () => {
  let calculator: any;

  let mockLogger: any;

  beforeEach(() => {
    mockLogger = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: 'LoggerService', useValue: mockLogger }
      ]
    });
    calculator = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  it("should multiply two numbers", () => {
    const result = calculator.multiply(2, 3);
    expect(result).toBe(6);
  });
});