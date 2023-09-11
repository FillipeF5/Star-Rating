import { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { Button } from 'carbon-components-react';


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
      <div className="container">

        <div className="container-md mx-auto mt-10 w-1/2 h-min bg-stone-200 rounded-md flex flex-col p-5 text-center">
          <h2 className='text-black my-3'>How many stars would you give to our App?</h2>
          <div className="flex flex-row justify-center">
            {stars.map((_, index) => {
              return (
                <FaStar
                  className="text-4xl mx-2"
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

          <p className='m-5 text-black'>{message}</p>

          <Button
            className="rounded-lg hover:bg-purple-800 bg-purple-500 w-auto p-2 m-auto"
            onClick={handleSubmit}
          >Submit</Button>
        </div>


        <div className='container-md mx-auto w-1/2 h-min bg-stone-200 rounded-md flex flex-col p-5 m-7 shadow-xl shadow-black-50'>
          <h2 className='text-center text-black'>This is our average rating in the app store: {averageRating}</h2>

          <div className='flex flex-row justify-center m-3'>

            {stars.map((_, index) => {
              return (
                <FaStar
                  className="text-4xl mx-2"
                  key={index}
                  color={(averageRating) > index ? "orange" : "grey"}
                />
              )
            })}
          </div>

        </div>

      </div>
    </>
  )
}

export default App;