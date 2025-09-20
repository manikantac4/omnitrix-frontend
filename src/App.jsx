// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/herosection"
import GlobalBackground from "./components/globalbackground";

const App = () => {
  return (
    <Router>
      <GlobalBackground />
      <div className="relative z-10">
        <Routes>
        <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
