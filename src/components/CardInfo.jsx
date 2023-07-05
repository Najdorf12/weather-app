import sunshine from "../../public/1.svg";
import axios from "axios";
import { useState, useEffect } from "react";

export function Card({ coord }) {

  const [info, setInfo] = useState({});
  const { name, main, weather } = info;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=3c2937f10b7ceef88f8034b8274b1376`
      )
      .then((resp) => {
        setInfo(resp.data);
      })
      .catch((error) => console.error(error));
  }, [coord]);

  const [isKelvin, setKelvin] = useState(true);

  const changeTemp = () => {
    if (isKelvin) {
      setKelvin(false);
    } else {
      setKelvin(true);
    }
  };
  let kelvinToCels = isKelvin
    ? main?.temp?.toFixed()
    : (main?.temp - 273.15).toFixed();
  let kelvinToCelsMin = isKelvin
    ? main?.temp_min?.toFixed()
    : (main?.temp_min - 273.15).toFixed();
  let kelvinToCelsMax = isKelvin
    ? main?.temp_max?.toFixed()
    : (main?.temp_max - 273.15).toFixed();

  const [darkMode, setDarkMode] = useState(true);
  const changeTheme = () => {
    if (darkMode) {
      document.body.style = ` background: radial-gradient(
                circle,
                 #d5f3ff 0%,
                 #51b4e8 100%
              );`;
      setDarkMode(false);
    } else {
      setDarkMode(true);
      document.body.style = `background: radial-gradient(
                    circle,
                    var(--violetsoft) 0%,
                    var(--violet) 100%
                  );`;
    }
  };
  const toogleDarkMode = darkMode
    ? "card-container"
    : "card-container cardDarkMode";

  return (
    <>
      <section className={toogleDarkMode}>
        <div className="card-info">
          <h1 className="card-temp">
            {kelvinToCels} {isKelvin ? "k" : "ºc"}
          </h1>
          <div className="card-temp_info">
            <p>
              <i className="bx bxs-droplet"></i>Humedity: {main?.humidity}%
            </p>
            <p>
              <i className="bx bxs-thermometer"></i>
              Min:{kelvinToCelsMin} {isKelvin ? "k" : "ºc"}
            </p>
            <p>
              <i className="bx bxs-thermometer"></i>
              Max:{kelvinToCelsMax} {isKelvin ? "k" : "ºc"}
            </p>
          </div>
          <div className="card-location">
            <h3>
              <i className="bx bxs-map"></i>
              {name}
            </h3>
            <p>{weather?.length > 0 ? weather[0]?.description : false}</p>
          </div>
        </div>
        <div className="icon-weather">
          <img src={sunshine} alt="" />
        </div>
      </section>
      <button onClick={changeTemp} className="btn-temp">
        Change Temp
      </button>
      <button onClick={changeTheme} className="btn-darkMode">
        <i className="bx bxs-sun"></i>
      </button>
    </>
  );
}
