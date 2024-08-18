import React from "react";

export default function calculateFps() {
  // Variables for FPS calculation
  let fpsStartTime = 0;
  let fpsEndTime = 0;
  let fpsTicks = 0;
  let fpsIsRunning = false;

  const newAnimationLoop = () => {
    if (fpsIsRunning) {
      fpsTicks += 1;
      requestAnimationFrame(newAnimationLoop);
    }
  };

  // Start FPS COunt
  const startFpsCount = () => {
    fpsStartTime = Date.now();
    fpsTicks = 0;
    fpsIsRunning = true;
    newAnimationLoop();
  };

  // Stop FPS COunt
  const stopFpsCount = (moduleName) => {
    fpsEndTime = Date.now();
    fpsIsRunning = false;
    const elapsed = fpsEndTime - fpsStartTime;
    const fps = Math.round((fpsTicks * 1000) / elapsed);
    console.log(`Result Total FPS for ${moduleName}:`, fps + "fps");
  };

  return { startFpsCount, stopFpsCount };
}
