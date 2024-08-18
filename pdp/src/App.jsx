import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
const Header = React.lazy(() => import("Home/Header"));
import Footer from "Home/Footer";

import "./index.css";

const App = () => (
  <div className="container" style={{ margin: 50 }}>
    <Suspense fallback={null}>
      <Header />
    </Suspense>
    <Footer />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
