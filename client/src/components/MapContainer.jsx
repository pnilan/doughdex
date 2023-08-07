import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../config.js';

const MapContainer = ({ pizzerias, setSelectedPizzeria }) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY
  });

  const center = useMemo(() => ({lat: 37.7751, lng: -122.4303}), []);
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: '5a7329e1aff28afa'
  }), []);

  return (
    <section className="map-section">
      { isLoaded ? (
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
        >
          {pizzerias.map((pizzeria) => {
            return (
              <Marker
                key={pizzeria.id}
                position={pizzeria.location}
                icon={'https://img.icons8.com/?size=50&id=120099&format=png'}
                onClick={() => setSelectedPizzeria(pizzeria) }
              />
            );
          })}
        </GoogleMap>
      ) : (<></>) }
    </section>
  );
};

export default MapContainer;