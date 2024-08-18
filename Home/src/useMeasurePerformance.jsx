import { useEffect, useRef } from "react";

export const useMeasurePerformance = () => {
  // Refs for the observers
  const lcpObserverRef = useRef(null);
  const moduleLoadObserverRef = useRef(null);

  useEffect(() => {
    lcpObserverRef.current = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("Result LCP:", Math.round(lastEntry.startTime));
    });

    moduleLoadObserverRef.current = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (
          entry.initiatorType === "script" &&
          /remoteEntry\.js$/.test(entry.name)
        ) {
          console.log(
            "Result Module Federation Module Loaded:",
            entry.name,
            "in",
            entry.duration + "ms"
          );
        }
      });
    });

    return () => {
      stopLCPObservation();
      stopModuleLoadObservation();
    };
  }, []);

  const startLCPObservation = () => {
    lcpObserverRef.current.observe({
      type: "largest-contentful-paint",
      buffered: true,
    });
  };

  const stopLCPObservation = () => {
    if (lcpObserverRef.current) {
      lcpObserverRef.current.disconnect();
    }
  };

  const startModuleLoadObservation = () => {
    moduleLoadObserverRef.current.observe({ type: "resource", buffered: true });
  };

  const stopModuleLoadObservation = () => {
    if (moduleLoadObserverRef.current) {
      moduleLoadObserverRef.current.disconnect();
    }
  };

  return {
    startLCPObservation,
    stopLCPObservation,
    startModuleLoadObservation,
    stopModuleLoadObservation,
  };
};
