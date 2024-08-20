import { useEffect, useRef } from "react";

export const useMeasurePerformance = () => {
  // Refs for the observers
  const moduleLoadObserverRef = useRef(null);

  useEffect(() => {
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
      stopModuleLoadObservation();
    };
  }, []);

  const startModuleLoadObservation = () => {
    moduleLoadObserverRef.current.observe({ type: "resource", buffered: true });
  };

  const stopModuleLoadObservation = () => {
    if (moduleLoadObserverRef.current) {
      moduleLoadObserverRef.current.disconnect();
    }
  };

  return {
    startModuleLoadObservation,
    stopModuleLoadObservation,
  };
};
