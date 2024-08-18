import React, { Suspense, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { TimeTracker } from "./TimeTracker.jsx";

const Details = React.lazy(() =>
  TimeTracker(() => import("Description/Details"), "Description/Details")
);

const Contents = React.lazy(() =>
  TimeTracker(() => import("pdp/contents"), "pdp/contents")
);

import { useMeasurePerformance } from "./useMeasurePerformance.jsx";

export default function Main() {
  const {
    startLCPObservation,
    stopLCPObservation,
    startModuleLoadObservation,
    stopModuleLoadObservation,
  } = useMeasurePerformance();

  useEffect(() => {
    startLCPObservation();
    startModuleLoadObservation();
    return () => {
      stopLCPObservation();
      stopModuleLoadObservation();
    };
  }, []);

  return (
    <div>
      <div className="container" style={{ margin: 50 }}>
        <div id="performance-results"></div>
        <Header elementtiming="header" />
        <p style={{ color: "red" }}>Home Page contents</p>
        <Suspense>
          <Details />
        </Suspense>

        <img
          elementtiming="big-image"
          src="https://googlechrome.github.io/samples/picture-element/images/kitten-large.png"
        />
        <p elementtiming="para">Hello world from p tag</p>
        <Suspense>
          <Contents elementtiming="contents" />
        </Suspense>
        <Footer elementtiming="footer" />
      </div>
    </div>
  );
}
