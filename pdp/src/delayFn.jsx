import React, { Suspense } from "react";

// Function to simulate a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lazy load the component with an artificial delay
const LazyContents = React.lazy(() =>
  delay(3000).then(() => import("./contents"))
);

export default function delayFn() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <LazyContents />
    </Suspense>
  );
}
