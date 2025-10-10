// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Component imports
import Hero from "./components/herosection";
import GlobalBackground from "./components/globalbackground";
import Detail from "./components/detailsection";
import FAQ from "./components/FAQ";
import Theme from "./components/Themes";
import Sponsor from "./components/sponser";
import Contact from "./components/contact";
import Prize from "./components/prizes";
import Hacktime from "./components/hacktime";
import QuizApp from "./components/QuizApp";
import AdminLeaderboard from "./components/AdminLeaderboard";

// ScrollToTop component - must be inside Router
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

function App() {
  // Scroll to top on first load
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
       {/*  <Route path="/form" element={<Form />} />*/}
          <Route path="/theme" element={<Theme />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prize" element={<Prize />} />
          <Route path="/hacktime" element={<Hacktime />} />
          <Route path="/quiz" element={<QuizApp />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
  
          
          {/* Optional: 404 Fallback Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
