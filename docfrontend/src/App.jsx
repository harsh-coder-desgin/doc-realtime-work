import { useState ,useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {
  const featureRef = useRef(null);
  const [loading, SetLoading] = useState(false)
  
  const outletContextValue = { featureRef };

  const scrollToFeature = () => {
    featureRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <Navbar onFeatureClick={scrollToFeature}/>
        <main className="flex-grow">
          <Outlet context={outletContextValue}/>
        </main>
        <Footer />
      </div>
    </>
  ) : null
}

export default App