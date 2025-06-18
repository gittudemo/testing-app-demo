import { LoggerService } from "./logger.service";

describe("logger service", () => {

  it("should log messages", () => {
    const logger = new LoggerService();
    const consoleSpy = spyOn(console, 'log');
    
    logger.log("Test message");
    
    expect(consoleSpy).toHaveBeenCalledWith("LOGGER LOG:Test message");
    expect(consoleSpy).withContext('should call only once').toHaveBeenCalledTimes(1);
    expect(consoleSpy.calls.first().args[0]).toBe("LOGGER LOG:Test message");
    
  });
});