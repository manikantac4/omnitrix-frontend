// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/herosection"
import GlobalBackground from "./components/globalbackground";
import Form  from "./components/Register";

const App = () => {
  return (
    <Router>
      <GlobalBackground />
      <div className="relative z-10">
        <Routes>
        <Route path="/home" element={<Hero />} />
        <Route path="/form" element={<Form/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
