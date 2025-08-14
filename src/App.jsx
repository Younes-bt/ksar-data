import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import translations from "./i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import NewInsightsPage from "./pages/NewInsightsPage";
import About from "./pages/About";
import RgphPage from "./pages/RgphPage"; 
import RgphInsights from "./pages/RgphInsights"; 
import MedicinePrices from "./pages/MedicinePrices"; 
import SupportGrants from "./pages/SupportGrants";
import Attendance from "./pages/Attendance";
import PersonsAttendance from "./pages/PersonsAttendance";
import Decisions from "./pages/Decisions";
import ContactUs from "./pages/ContactUs";
import Download from "./pages/Download";
import HistoricalMap from './pages/HistoricalMap';
import ScoresPage from "./pages/ScoresPage";
import ComingSoon from "./pages/ComingSoon";
import DidYouKnow from "./pages/DidYouKnow";
import ScrollToTop from './components/ScrollToTop'; 
import DisclaimerBanner from './components/DisclaimerBanner';
// MODIFICATION: Import the new page components
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfUsePage from "./pages/TermsOfUse";

// Component to handle conditional rendering
function AppContent({ 
  scoresData, budgetData, rgphData, medicineData, supportData, 
  attendanceData, votingsData, placesData, loading, error, 
  language, setLanguage, theme, setTheme, t 
}) {
  const location = useLocation();
  
  const hideNavbarRoutes = ['/soon'];
  const hideFooterRoutes = ['/soon'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && (
        <Navbar
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          t={t}
        />
      )}

      <main className="flex-grow">
        <Routes>
          {/* ... other routes remain unchanged ... */}
          <Route
            path="/"
            element={<Home t={t} language={language} theme={theme} />}
          />
          <Route
            path="/search"
            element={
              <SearchPage
                data={budgetData}
                loading={loading}
                t={t}
                language={language}
                theme={theme}
              />
            }
          />
          <Route
            path="/rgph"
            element={
              <RgphPage
                data={rgphData}
                loading={loading}
                t={t}
                language={language}
                theme={theme}
              />
            }
          />
          <Route 
            path="/insights" 
            element={
              <NewInsightsPage 
                data={budgetData} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/insights2" 
            element={
              <RgphInsights 
                data={rgphData} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/medicines" 
            element={
              <MedicinePrices 
                data={medicineData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/support" 
            element={
              <SupportGrants 
                data={supportData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <Attendance 
                data={attendanceData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/persons-attendance" 
            element={
              <PersonsAttendance 
                data={attendanceData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/decisions" 
            element={
              <Decisions 
                data={votingsData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <About 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/contactUs" 
            element={
              <ContactUs 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/soon" 
            element={
              <ComingSoon 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/download" 
            element={
              <Download 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/map" 
            element={
              <HistoricalMap 
                data={placesData}
                loading={loading}
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/scores" 
            element={
              <ScoresPage 
                data={scoresData} 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/facts" 
            element={
              <DidYouKnow 
                loading={loading} 
                t={t} 
                language={language} 
                theme={theme} 
              />
            } 
          />
          
          {/* MODIFICATION: Add new routes for legal pages */}
          <Route 
            path="/privacy-policy" 
            element={
              <PrivacyPolicyPage 
                language={language} 
                theme={theme} 
              />
            } 
          />
          <Route 
            path="/terms-of-use" 
            element={
              <TermsOfUsePage 
                language={language} 
                theme={theme} 
              />
            } 
          />

        </Routes>
      </main>

      {!shouldHideFooter && <Footer language={language} theme={theme} />}
    </div>
  );
}

function App() {
  // ... (The rest of the App component remains unchanged) ...
  const [scoresData, setScoresData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [rgphData, setRGPHData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [votingsData, setVotingsData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("ar");
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    
    const loadBudgetData = fetch("full_data_v6.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadRGPHData = Promise.all([
      fetch("/part1_json.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`)),
      fetch("/part2_json.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`))
    ]).then(([part1, part2]) => [...part1, ...part2]);
    const loadScoresData = fetch("/scores.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadMedicineData = fetch("/medicament_prices.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadSupportData = fetch("/support_list.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadAttendanceData = fetch("/attendence_all.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadVotingsData = fetch("/voting_sort_2.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));
    const loadPlacesData = fetch("/places.json").then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`));

    Promise.all([loadBudgetData, loadRGPHData, loadMedicineData, loadSupportData, loadAttendanceData, loadVotingsData, loadPlacesData, loadScoresData])
      .then(([budgetData, rgphData, medicineData, supportData, attendanceData, votingsData, placesData, scoresData]) => {
        setBudgetData(budgetData);
        setRGPHData(rgphData);
        setMedicineData(medicineData || []);
        setSupportData(supportData || []);
        setAttendanceData(attendanceData || []);
        setVotingsData(votingsData || []);
        setPlacesData(placesData || []);
        setScoresData(scoresData || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Data fetch error:", err);
        setError("Failed to load critical data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const t = translations[language];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* ... loading spinner ... */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* ... error message ... */}
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
     <AppContent 
        scoresData={scoresData}
        budgetData={budgetData}
        rgphData={rgphData}
        medicineData={medicineData}
        supportData={supportData}
        attendanceData={attendanceData}
        votingsData={votingsData}
        placesData={placesData}
        loading={loading}
        error={error}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />
    </Router>
  );
}


export default App;