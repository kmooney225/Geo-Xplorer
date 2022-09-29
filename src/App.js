import { useState, useEffect } from 'react';
import data from './components/Data';
import './App.css';
import Globe from 'react-globe.gl'
import dim from './useWindowDimensions.js'

function App() {


  const [countryItems, initCountry] = useState([])
  const fetchData = async () => {
      const response = await fetch('https://restcountries.com/v3.1/name/japan')
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }
    useEffect(() => {
      fetchData()
        .then((res) => {
          initCountry(res)
        })
        .catch((e) => {
          console.log(e.message)
        })
    }, [])

  const { height, width } = dim();
  const { country, setCountry} = useState()


  let countryName;
  let coord = {
    lat: 0,
    lng: 0,
  }

  {countryItems.map((item) => {
     coord.lat = item.latlng[0]
     coord.lng = item.latlng[1]
     countryName = item.name.common
  })}

  console.log(countryItems)

  return (
    <div>
        <Globe width={width}
         height={height}
         globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
         backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
         labelLat={coord.lat}
        labelLng={coord.lng}
        labelText={countryName}
        labelSize={10}
        labelDotRadius={10}
        labelColor={() => 'rgba(255, 180, 150, .8)'}
      />
      
    </div>
  );
}

export default App;
