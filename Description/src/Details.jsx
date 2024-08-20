import React, { useEffect } from "react";

export default function Details() {
  useEffect(() => {
    const start = performance.now();

    const handleDOMContentLoaded = () => {
      console.log("Result Start Time - Details:", start);
      window.dispatchEvent(new CustomEvent(`details-dom-content-loaded`));
    };

    const handlePdpDomContentLoaded = () => {
      const end = performance.now();
      console.log("Result total time of Details:", end - start);
    };

    window.addEventListener("load", handleDOMContentLoaded);
    window.addEventListener(
      "details-dom-content-loaded",
      handlePdpDomContentLoaded
    );

    return () => {
      window.removeEventListener("load", handleDOMContentLoaded);
      window.removeEventListener(
        "details-dom-content-loaded",
        handlePdpDomContentLoaded
      );
    };
  }, []);
  return (
    <div>
      <p style={{ color: "blue" }}>
        This is the Description for all the components generated from :
        DESCRIPTION MODULE
      </p>
    </div>
  );
}
