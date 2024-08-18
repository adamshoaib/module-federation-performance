import React, { useEffect } from "react";
import Monitor from "./Monitor"; // Adjust the path according to where your Monitor.js is located

const MonitorPerformance = () => {
  useEffect(() => {
    const monitor = new Monitor();
    monitor.start();

    return () => {
      // Clean up if necessary
    };
  }, []);

  return null; // The monitor UI is injected directly into the DOM, so no need to render anything
};

export default MonitorPerformance;
