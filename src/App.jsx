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
import MVPSubmissionComponent from "./components/MVPComponent";
import Contact from "./components/contact";
import Prize from "./components/prizes";
import Hacktime from "./components/hacktime";
import QuizApp from "./components/QuizApp";
import AdminLeaderboard from "./components/AdminLeaderboard";
import QuizCountdown from "./components/QuizCountdown";
import Form from "./components/Register";
import Payment from "./components/payment";
import Gallery2025 from "./components/Gallery";
import FirstRound from "./components/firstround";
import Fun from  "./components/Funquiz";
import Timer from "./components/timer";
import TechStackSubmissionComponent from "./components/TechStackSubmissionComponent";
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
       <Route path="/testform/friends" element={<Form/>}/>
          <Route path="/theme" element={<Theme />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prize" element={<Prize />} />
          <Route path="/hacktime" element={<Hacktime />} />
          <Route path="/quiz" element={<QuizCountdown />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
         <Route path="/test" element={<QuizApp/>}/>
         <Route path="/payment" element={<Payment/>}/>
         <Route path="/gallery" element={<Gallery2025/>}/>
         <Route path="/first-round" element={<FirstRound/>}/>
         <Route path='/funquiz' element={<Fun/>}/>
         <Route path='/timer' element ={<Timer/>}/>
         <Route path="/second-round" element={<TechStackSubmissionComponent/>}/>
         <Route path="/third-round" element={<MVPSubmissionComponent/>}/>
          {/* Optional: 404 Fallback Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
