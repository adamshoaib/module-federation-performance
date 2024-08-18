import { renderHook } from "@testing-library/react";
import { usePerformance } from "./usePerformance";

describe("usePerformance", () => {
  let observerCallback;

  beforeEach(() => {
    // Mock PerformanceObserver
    global.PerformanceObserver = jest.fn().mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    // Mock console.log
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("logs the correct message when a remoteEntry.js script is loaded", () => {
    renderHook(() => usePerformance());

    // Simulate a PerformanceEntry that matches the criteria
    const entry = {
      name: "http://example.com/remoteEntry.js",
      initiatorType: "script",
      duration: 120,
    };

    // Trigger the observer callback with the mock entry
    observerCallback({ getEntries: () => [entry] });

    // Check that the correct console.log call was made
    expect(console.log).toHaveBeenCalledWith(
      "Module Federation Module Loaded:",
      entry.name,
      "in",
      entry.duration + "ms"
    );
  });

  it("does not log if the entry is not remoteEntry.js", () => {
    renderHook(() => usePerformance());

    // Simulate a PerformanceEntry that does not match the criteria
    const entry = {
      name: "http://example.com/someOtherScript.js",
      initiatorType: "script",
      duration: 80,
    };

    // Trigger the observer callback with the mock entry
    observerCallback({ getEntries: () => [entry] });

    // Ensure console.log was not called
    expect(console.log).not.toHaveBeenCalled();
  });
});
