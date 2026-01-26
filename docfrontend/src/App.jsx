import { useState ,useRef, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {
  const featureRef = useRef(null);
  const HomeeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, SetLoading] = useState(false)

  const outletContextValue = { featureRef , HomeeRef};

  const scrollToFeature = () => {
    featureRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    HomeeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (location.state?.scrollTo === "feature") {
      featureRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navigate(location.pathname, { replace: true });
    }
    if (location.state?.scrollTo === "Top") {
      HomeeRef.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <Navbar onFeatureClick={scrollToFeature} ontop={scrollToTop}/>
        <main className="flex-grow">
          <Outlet context={outletContextValue}/>
        </main>
        <Footer />
      </div>
    </>
  ) : null
}

export default App