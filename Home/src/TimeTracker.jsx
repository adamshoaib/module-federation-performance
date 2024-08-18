import React from "react";
import calculateFps from "./calculateFps.jsx";

export const TimeTracker = async (remoteModule, moduleName) => {
  const { startFpsCount, stopFpsCount } = calculateFps();
  startFpsCount();
  const module = await remoteModule();
  stopFpsCount(moduleName);

  return module;
};
