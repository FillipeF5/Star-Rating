import { useState } from 'react'
import './App.css'
import { FaStar } from 'react-icons/fa'
import { Button } from 'carbon-components-react';
import "react-color-palette/css";



function App() {

    //usar Array(5).fill(0) para inicializar as estrelas com valor 0 cada uma e salvar em uma constante 
    const stars = Array(5).fill(0);           //é o mesmo que dizer agora : [0,0,0,0,0] >>> array de 5 elementos, cada um com valor 0 inicial.

    const [message, setMessage] = useState("Please, rate (:");
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    const handleClick = value => {
      setCurrentValue(value)
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

    const handleMouseLeave = () => {
      setHoverValue(undefined)
    };

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
              style={{cursor: "pointer"}}
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
        onClick={() => { console.log(currentValue,  message)}}
        >Submit</Button>

      </div>
    </div>
    </>
  )
}

export default App;