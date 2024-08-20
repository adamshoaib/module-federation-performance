import React, { Suspense, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Details = React.lazy(
  () => import("Description/Details"),
  "Description/Details"
);

const Contents = React.lazy(() => import("pdp/contents"), "pdp/contents");

import { useMeasurePerformance } from "./useMeasurePerformance.jsx";

export default function Main() {
  const { startModuleLoadObservation, stopModuleLoadObservation } =
    useMeasurePerformance();

  // useEffect(() => {
  //   startModuleLoadObservation();
  //   return () => {
  //     stopModuleLoadObservation();
  //   };
  // }, []);

  useEffect(() => {
    const start = performance.now();

    const handleDOMContentLoaded = () => {
      console.log("Result Start Time - Main:", start);
      window.dispatchEvent(new CustomEvent(`home-dom-content-loaded`));
    };

    const handlePdpDomContentLoaded = () => {
      const end = performance.now();
      console.log("Result total time of Home:", end - start);
    };

    window.addEventListener("load", handleDOMContentLoaded);
    window.addEventListener(
      "home-dom-content-loaded",
      handlePdpDomContentLoaded
    );

    return () => {
      window.removeEventListener("load", handleDOMContentLoaded);
      window.removeEventListener(
        "home-dom-content-loaded",
        handlePdpDomContentLoaded
      );
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
        <Suspense>
          <Contents elementtiming="contents" />
        </Suspense>

        <img
          elementtiming="big-image"
          src="https://googlechrome.github.io/samples/picture-element/images/kitten-large.png"
        />
        <p elementtiming="para">Hello world from p tag</p>

        <Footer elementtiming="footer" />
      </div>
    </div>
  );
}
