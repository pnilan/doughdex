import React from 'react';
import PizzeriaCard from './PizzeriaCard.jsx';
import { IconContext } from 'react-icons';
import { BsChevronDown, BsChevronUp, BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill } from 'react-icons/bs';

const PizzeriaList = ({ pizzerias, handleClick, range, getPizzerias, setSelectedPizzeria }) => {



  return (
    <div className="pizzeria-list">
      <div className="chevron-container">
        { !!range ? (
          <button onClick={() => handleClick(-1)} >
            <IconContext.Provider value={{ className: 'chevron-icons' }}>
              <BsChevronUp />
            </IconContext.Provider>
          </button>
        ) : (
          <></>
        )}
      </div>
      { pizzerias.map((pizzeria) => {
        return (
          <PizzeriaCard key={pizzeria.id} pizzeria={pizzeria} getPizzerias={getPizzerias} setSelectedPizzeria={setSelectedPizzeria} />
        );
      })}
      <div className="chevron-container">
        <button onClick={() => handleClick(1)}>
          <IconContext.Provider value={{ className: 'chevron-icons' }}>
            <BsChevronDown />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default PizzeriaList;