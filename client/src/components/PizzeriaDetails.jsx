import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { API_KEY } from '../config.js';

const PizzeriaDetails = ({ selectedPizzeria, setSelectedPizzeria }) => {

  const [ details, setDetails ] = useState({});
  const [ photoSrc, setPhotoSrc ] = useState('');

  useEffect(() => {
    if (!!selectedPizzeria.id) {
      getDetailedInformation(selectedPizzeria.google_maps_places_id)
        .then((res) => {
          var data = res.data.result;
          var detailsObject = {
            found: true,
            openNow: data.current_opening_hours.open_now,
            operatingHours: data.current_opening_hours.weekday_text,
            photo: data.photos[0].photo_reference,
            priceLevel: data.price_level,
            rating: data.rating,
            ratingsCount: data.user_ratings_total,
            hasDelivery: data.delivery,
            hasDinein: data.dine_in,
            servesBeer: data.serves_beer,
            servesWine: data.serves_wine,
            website: data.website
          };
          setDetails(detailsObject);
        })
        .catch((err) => {
          console.error('Error fetching pizzeria details:', err);
        });
    }
  }, [selectedPizzeria]);

  const getDetailedInformation = (googleId) => {
    return axios.get(`/api/pizzerias/places/${googleId}`);
  };

  const handleCloseClick = () => {
    setSelectedPizzeria({});
    setDetails({});
  };

  if (!details.found) { return (<></>); }

  return (
    <div className="details-card">
      <div className="photo-container">
        <img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${details.photo}&key=${API_KEY}&maxwidth=600`} className="pizzeria-photo"></img>
      </div>
      <div className="icon-container">
        <button className="exit-details" onClick={() => handleCloseClick()}>
          <IconContext.Provider value={{ className: 'exit-icon'}} >
            <GrClose/>
          </IconContext.Provider>
        </button>
      </div>
      <div className="details-container">
        <h1>{selectedPizzeria.name}</h1>
        <h3>{selectedPizzeria.address}</h3>
        <a href={details.website} target="_">{details.website}</a>
        <p>Open Now: {details.openNow ? ( 'Open!' ) : ( 'Closed' )}</p>
        <p>Rating: {details.rating} from {details.ratingsCount} reviews.</p>
        <p>Delivers: {details.hasDelivery ? ('Yes') : ('No')}</p>
        <p>Dine-in: {details.hasDinein ? ('Yes') : ('No')}</p>
        <p>Serves Beer: {details.servesBeer ? ('Yes') : ('No')}</p>
        <p>Serves Wine: {details.servesWine ? ('Yes') : ('No')}</p>
      </div>
    </div>
  );
};

export default PizzeriaDetails;