import { CalculatorService } from "./calculator.service";

describe("calculator service", () => {
  let calculator: any;

  let mockLogger: any;

  beforeEach(() => {
    mockLogger = jasmine.createSpy('log') ;
    calculator = new CalculatorService(mockLogger);  //write common code in beforeEach
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