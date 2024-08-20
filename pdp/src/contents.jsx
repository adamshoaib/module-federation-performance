import React, { useEffect } from "react";

function contents() {
  useEffect(() => {
    const start = performance.now();

    const handleDOMContentLoaded = () => {
      console.log("Result Start Time - contents:", start);
      window.dispatchEvent(new CustomEvent(`pdp-dom-content-loaded`));
    };

    const handlePdpDomContentLoaded = () => {
      const end = performance.now();
      console.log("Result total time of contents:", end - start);
    };

    window.addEventListener("load", handleDOMContentLoaded);
    window.addEventListener(
      "pdp-dom-content-loaded",
      handlePdpDomContentLoaded
    );

    return () => {
      window.removeEventListener("load", handleDOMContentLoaded);
      window.removeEventListener(
        "pdp-dom-content-loaded",
        handlePdpDomContentLoaded
      );
    };
  }, []);

  return (
    <div>
      <p style={{ color: "green" }}>PDP Page contents</p>
    </div>
  );
}

export default contents;
