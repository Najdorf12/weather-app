import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Card } from "./components/CardInfo.jsx";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setCoord(crd);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  const [coord, setCoord] = useState({
    latitude: "", //string vacio para que falle la primera vez y no traiga globe por lat 0 y long 0
    longitude: "", //string vacio para que falle la primera vez y no traiga globe por lat 0 y long 0
  });

  return (
    <>
      <Navbar />
      <Card coord={coord} />
    </>
  );
}

export default App;

