// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/herosection"
import GlobalBackground from "./components/globalbackground";
import Form from "./components/Register";
import Detail from "./components/detailsection";
import FAQ from "./components/FAQ";
import Theme from "./components/Themes";
import Sponsor from "./components/sponser";
import Contact from "./components/contact";
import Prize from "./components/prizes";
import Hacktime from "./components/hacktime";
import Timer from "./timer";
import LoginComponent from "./login";
// Import other components as needed

// ScrollToTop component - must be inside Router
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change and page refresh
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

function App() {
  // Additional scroll to top on initial app load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const HomePage = () => (
    <>
      <Hero />
    </>
  );

  return (
    <Router>
      <ScrollToTop />
      <GlobalBackground />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Detail />} />
          <Route path="/form" element={<Form />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prize" element={<Prize />} />
          <Route path="/hacktime" element={<Hacktime />} />          <Route path="/timer" element={<Timer />} />
          <Route path="/login" element={<LoginComponent />} />
                  </Routes>
      </div>
    </Router>
  );
}

export default App;