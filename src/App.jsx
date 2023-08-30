import React, { useState, useEffect } from 'react'
import './App.css'
import { FaStar } from 'react-icons/fa'
import { Button } from 'carbon-components-react';
import "react-color-palette/css";


function App() {
  //Inicializando o array de estrelas vazias   [0,0,0,0,0]
  //  Array(5) inicializar um array de 5 elementos    .fill(0) altera o valor de todos os elementos pra valor estatico 0 e retorna o novo array 
  const stars = Array(5).fill(0);

  const [message, setMessage] = useState("Rate me");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [currentStar, setCurrentStar] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    localStorage.setItem("ratings", currentStar);
  }, [currentStar])

  const handleClick = value => {
    setCurrentValue(value)
    setCurrentStar([...currentStar, value])
    switch (value) {
      case 1:
        setMessage("OMG, wtf ?")
        break;
      case 2:
        setMessage("Really?")
        break;
      case 3:
        setMessage("Well...")
        break;
      case 4:
        setMessage("Tks !! (:")
        break;
      case 5:
        setMessage("WOW !!! Thanks for your rating")
        break;
    }
  };

  const handleMouseOver = value => {
    setHoverValue(value)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  };

  const handleSubmit = () => {
    const calcAverage = () => {
      if (currentStar.length === 0) {
        return 0;
      }
      const sum = currentStar.reduce((total, value) => total + value, 0);
      const average = sum / currentStar.length;
      return Math.round(average);
    }

    setAverageRating(calcAverage())
    setCurrentValue(0)
    setMessage("Rate me")

    // console.log(currentStar)
    // console.log(localStorage.getItem("ratings"))
  }

  return (
    <>
      <div className="App">
        <div className="box">
          <h2>How many stars would you give to our App?</h2>
          <div className="stars">
            {stars.map((_, index) => {
              return (
                <FaStar
                  className="star"
                  key={index}
                  style={{ cursor: "pointer" }}
                  color={(hoverValue || currentValue) > index ? "orange" : "grey"}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              )
            })}
          </div>

          <p>{message}</p>

          <Button
            id="btn-submit"
            onClick={handleSubmit}
          >Submit</Button>

          <div className='total_rating'>
            <h2>This is our average rating in the app store: {averageRating}</h2>

            <p>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    className="star"
                    key={index}
                    color={(averageRating) > index ? "orange" : "grey"}
                  />
                )
              })}
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;