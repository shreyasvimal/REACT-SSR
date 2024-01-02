import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const CarsComponent = lazy(() =>
  import("./cars/Cars.js" /* webpackPrefetch: true */)
);

const HomeComponent = lazy(() =>
  import("./home/Home.js" /* webpackPrefetch: true */)
);

const LocationComponent = lazy(() =>
  import("./locations/locations.js" /* webpackPrefetch: true */)
);

const LoadingScreen = () => {
  return <div>Loading Screen...</div>;
};

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="header">React 18 SSR</div>
      <Routes>
        <Route path="/cars" element={<CarsComponent />} />
        <Route path="/loc" element={<LocationComponent />} />
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </Suspense>
  );
}

export default App;
