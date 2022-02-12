import React, {useRef, useEffect} from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const {center, zoom} = props;

  useEffect(() => {

  const map = new window.google.maps.Map(mapRef.current, {
    center: center,
    zoom: zoom
  });

  new window.google.maps.Map({position: center, map: map})

  }, [center, zoom]);


  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
  )
};

export default Map;

// AIzaSyBW80O8dMsb1aiTi_jpUvOxl0Z8frt3T2g;