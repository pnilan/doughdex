import React from 'react';
import { IconContext } from 'react-icons';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import axios from 'axios';

const PizzeriaCard = ({ pizzeria, getPizzerias, setSelectedPizzeria }) => {


  const incrementLikes = (pizzeriaId) => {
    axios.put(`/api/pizzerias/${pizzeriaId}/like`)
      .then((res) => {
        getPizzerias();
      })
      .catch((err) => {
        console.error(`Error updating pizzeria ${pizzeriaId}'s ${attribute} count`);
      });
  };

  const incrementDislikes = (pizzeriaId) => {
    axios.put(`/api/pizzerias/${pizzeriaId}/dislike`)
      .then((res) => {
        getPizzerias();
      })
      .catch((err) => {
        console.error(`Error updating pizzeria ${pizzeriaId}'s ${attribute} count`);
      });
  };

  // const selectPizzeria = (pizzeria) => {
  //   setSelectedPizzeria(pizzeria);
  // };



  if (!pizzeria) {
    return (
      <div className="pizzeria-card">
        <h2>Loading...</h2>
        <p>123 Loading St</p>
        <p>San Francisco, CA 94102</p>
      </div>
    );
  } else {
    return (
      <div className="pizzeria-card">
        <div className="pizzeria-info" onClick={() => setSelectedPizzeria(pizzeria)}>
          <h2>{pizzeria.name}</h2>
          <p>{pizzeria.address}</p>
          { !!pizzeria.likes || !!pizzeria.dislikes ? (
            <h3>{Math.round(100 * pizzeria.likes / (pizzeria.likes + pizzeria.dislikes))}% approval rating!</h3>
          ) : (
            <h3>Be the first to like this pizzeria!</h3>
          )}
        </div>
        <div className="pizzeria-votes">
          <button onClick={() => incrementLikes(pizzeria.id)}>
            <IconContext.Provider value={{ className: 'like-buttons' }}>
              <BsHandThumbsUp />
            </IconContext.Provider>
          </button>
          <h3>{pizzeria.likes - pizzeria.dislikes}</h3>
          <button onClick={() => incrementDislikes(pizzeria.id)}>
            <IconContext.Provider value={{ className: 'like-buttons' }}>
              <BsHandThumbsDown />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    );
  }
};

export default PizzeriaCard;