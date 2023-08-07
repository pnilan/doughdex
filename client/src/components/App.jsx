import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import MapContainer from './MapContainer.jsx';
import PizzeriaList from './PizzeriaList.jsx';
import PizzeriaDetails from './PizzeriaDetails.jsx';

const App = () => {

  const [pizzerias, setPizzerias] = useState([]);
  const [activePizzerias, setActivePizzerias] = useState([]);
  const [range, setRange] = useState(0);
  const [selectedPizzeria, setSelectedPizzeria] = useState({});

  useEffect(() => {
    getPizzerias();
    setRange(0);
  }, []);

  useEffect(() => {
    setActivePizzerias(pizzerias.slice(range, range + 5));
  }, [pizzerias, range]);

  const getPizzerias = () => {
    axios.get('/api/pizzerias?count=300')
      .then((res) => {
        setPizzerias(res.data.results);
      })
      .catch((err) => {
        console.error('Error retrieving pizzeria data:', err);
      });
  };

  const incrementRange = (amount) => {
    console.log('triggered', amount);
    if (amount < 0 && range + amount >= 0) {
      setRange(range + amount);
    } else if (range + amount >= pizzerias.length - 5) {
      setRange(pizzerias.length - 5);
    } else {
      setRange(range + amount);
    }
  };


  return (
    <>
      <Header />
      <section className="container">
        <MapContainer pizzerias={activePizzerias} setSelectedPizzeria={setSelectedPizzeria} />
        { !!selectedPizzeria.id ? (
          <PizzeriaDetails selectedPizzeria={selectedPizzeria} setSelectedPizzeria={setSelectedPizzeria} />
        ) : (
          <></>
        )}
        <PizzeriaList pizzerias={activePizzerias} handleClick={incrementRange} range={range} getPizzerias={getPizzerias} setSelectedPizzeria={setSelectedPizzeria} />
      </section>
    </>
  );

};

export default App;