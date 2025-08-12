import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import translations from "./i18n";
import Navbar from "./components/Navbar";
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
import Decisions from "./pages/Decisions"; // Add Decisions import
import ContactUs from "./pages/ContactUs";
import Download from "./pages/Download";
import HistoricalMap from './pages/HistoricalMap';
import ScoresPage from "./pages/ScoresPage";
import ComingSoon from "./pages/ComingSoon";
import DidYouKnow from "./pages/DidYouKnow"

// Component to handle conditional navbar rendering
function AppContent({ 
  scoresData, budgetData, rgphData, medicineData, supportData, 
  attendanceData, votingsData, placesData, loading, error, 
  language, setLanguage, theme, setTheme, t 
}) {
  const location = useLocation();
  
  // Define routes where navbar should be hidden
  const hideNavbarRoutes = ['/'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && (
        <Navbar
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          t={t}
        />
      )}

      <Routes>
        <Route
          path="/Home-dev"
          element={<Home t={t} language={language} theme={theme} />}
        />
        <Route
          path="/search-dev"
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
          path="/rgph-dev"
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
          path="/insights-dev" 
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
          path="/insights2-dev" 
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
          path="/medicines-dev" 
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
          path="/support-dev" 
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
          path="/attendance-dev" 
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
          path="/persons-attendance-dev" 
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
          path="/decisions-dev" 
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
          path="/about-dev" 
          element={
            <About 
              t={t} 
              language={language} 
              theme={theme} 
            />
          } 
        />
        <Route 
          path="/contactUs-dev" 
          element={
            <ContactUs 
              t={t} 
              language={language} 
              theme={theme} 
            />
          } 
        />
        <Route 
          path="/" 
          element={
            <ComingSoon 
              t={t} 
              language={language} 
              theme={theme} 
            />
          } 
        />
        <Route 
          path="/download-dev" 
          element={
            <Download 
              t={t} 
              language={language} 
              theme={theme} 
            />
          } 
        />
        <Route 
          path="/map-dev" 
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
          path="/scores-dev" 
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
          path="/facts-dev" 
          element={
            <DidYouKnow 
              loading={loading} 
              t={t} 
              language={language} 
              theme={theme} 
            />
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  const [scoresData, setScoresData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [rgphData, setRGPHData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [votingsData, setVotingsData] = useState([]); // Add votings data state
  const [placesData, setPlacesData] = useState([]); // Add places data state
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
    
    // Load budget, RGPH, medicine, support, attendance, votings, and places data concurrently
    const loadBudgetData = fetch("full_data_v6.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      });

    const loadRGPHData = Promise.all([
      fetch("/part1_json.json").then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }),
      fetch("/part2_json.json").then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
    ]).then(([part1, part2]) => {
      // Combine both parts of RGPH data
      return [...part1, ...part2];
    });

    const loadScoresData = fetch("/scores.json")
  .then(res => {
    console.log("Scores data fetch response:", res.status, res.statusText);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    console.log("Scores data loaded successfully:", data?.length, "matches");
    return data;
  })
  .catch(err => {
    console.error("Scores data fetch error:", err);
    throw err;
  });

    const loadMedicineData = fetch("/medicament_prices.json")
      .then(res => {
        console.log("Medicine data fetch response:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Medicine data loaded successfully:", data?.length, "records");
        return data;
      })
      .catch(err => {
        console.error("Medicine data fetch error:", err);
        throw err;
      });

    const loadSupportData = fetch("/support_list.json")
      .then(res => {
        console.log("Support data fetch response:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Support data loaded successfully:", data?.length, "records");
        return data;
      })
      .catch(err => {
        console.error("Support data fetch error:", err);
        throw err;
      });

    const loadAttendanceData = fetch("/attendence_all.json")
      .then(res => {
        console.log("Attendance data fetch response:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Attendance data loaded successfully:", data?.length, "files");
        return data;
      })
      .catch(err => {
        console.error("Attendance data fetch error:", err);
        throw err;
      });

    // Add votings data loading
    const loadVotingsData = fetch("/voting_sort_2.json")
      .then(res => {
        console.log("Votings data fetch response:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Votings data loaded successfully:", data?.length, "records");
        return data;
      })
      .catch(err => {
        console.error("Votings data fetch error:", err);
        throw err;
      });

    // Add places data loading
    const loadPlacesData = fetch("/places.json")
      .then(res => {
        console.log("Places data fetch response:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Places data loaded successfully:", data?.length, "places");
        return data;
      })
      .catch(err => {
        console.error("Places data fetch error:", err);
        throw err;
      });

    // Execute all promises
    Promise.all([loadBudgetData, loadRGPHData, loadMedicineData, loadSupportData, loadAttendanceData, loadVotingsData, loadPlacesData, loadScoresData])
  .then(([budgetData, rgphData, medicineData, supportData, attendanceData, votingsData, placesData, scoresData]) => {
    setBudgetData(budgetData);
    setRGPHData(rgphData);
    setMedicineData(medicineData || []);
    setSupportData(supportData || []);
    setAttendanceData(attendanceData || []);
    setVotingsData(votingsData || []); 
    setPlacesData(placesData || []); 
    setScoresData(scoresData || []); // Add this line
    console.log("Loaded budget data:", budgetData.length, "records");
    console.log("Loaded RGPH data:", rgphData.length, "records");
    console.log("Loaded medicine data:", medicineData?.length || 0, "records");
    console.log("Loaded support data:", supportData?.length || 0, "records");
    console.log("Loaded attendance data:", attendanceData?.length || 0, "files");
    console.log("Loaded votings data:", votingsData?.length || 0, "records");
    console.log("Loaded places data:", placesData?.length || 0, "places");
    console.log("Loaded scores data:", scoresData?.length || 0, "matches"); // Add this line
    setError(null);
  })
      .catch((err) => {
        console.error("Data fetch error:", err);
        
        // Try to load individual datasets that might have succeeded
        Promise.allSettled([loadBudgetData, loadRGPHData, loadMedicineData, loadSupportData, loadAttendanceData, loadVotingsData, loadPlacesData, loadScoresData])
  .then(results => {
    const [budgetResult, rgphResult, medicineResult, supportResult, attendanceResult, votingsResult, placesResult, scoresResult] = results;
            
            if (budgetResult.status === 'fulfilled') {
              setBudgetData(budgetResult.value);
              console.log("Budget data loaded successfully as fallback");
            }
            if (rgphResult.status === 'fulfilled') {
              setRGPHData(rgphResult.value);
              console.log("RGPH data loaded successfully as fallback");
            }
            if (medicineResult.status === 'fulfilled') {
              setMedicineData(medicineResult.value);
              console.log("Medicine data loaded successfully as fallback");
            } else {
              console.warn("Medicine data failed to load:", medicineResult.reason);
              setMedicineData([]);
            }
            if (supportResult.status === 'fulfilled') {
              setSupportData(supportResult.value);
              console.log("Support data loaded successfully as fallback");
            } else {
              console.warn("Support data failed to load:", supportResult.reason);
              setSupportData([]);
            }
            if (attendanceResult.status === 'fulfilled') {
              setAttendanceData(attendanceResult.value);
              console.log("Attendance data loaded successfully as fallback");
            } else {
              console.warn("Attendance data failed to load:", attendanceResult.reason);
              setAttendanceData([]);
            }
            if (votingsResult.status === 'fulfilled') {
              setVotingsData(votingsResult.value);
              console.log("Votings data loaded successfully as fallback");
            } else {
              console.warn("Votings data failed to load:", votingsResult.reason);
              setVotingsData([]);
            }
            if (placesResult.status === 'fulfilled') {
              setPlacesData(placesResult.value);
              console.log("Places data loaded successfully as fallback");
            }
              if (scoresResult.status === 'fulfilled') {
      setScoresData(scoresResult.value);
      console.log("Scores data loaded successfully as fallback");
    } else {
      console.warn("Scores data failed to load:", scoresResult.reason);
      setScoresData([]);
    }
            
            // Only show error if all datasets failed
            const allFailed = results.every(result => result.status === 'rejected');
            if (allFailed) {
              setError("Failed to load data. Please try again later.");
            } else {
              setError(null);
            }
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const t = translations[language];

  // Show loading screen
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t?.common?.loading || "Loading Data..." || "جاري تحميل البيانات..."}
          </h2>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t?.common?.please_wait || "Please wait while we load the data" || "يرجى الانتظار بينما نقوم بتحميل البيانات"}
          </p>
        </div>
      </div>
    );
  }

  // Show error screen
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t?.common?.error_loading || "Error Loading Data" || "خطأ في تحميل البيانات"}
          </h2>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {t?.common?.retry || "Retry" || "إعادة المحاولة"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
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