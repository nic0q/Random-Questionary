import "./App.css"
import ListaPreguntas from "./ListaPreguntas"

import getPreguntas from "./services/getPreguntas"
import { useState, useEffect } from "react"

function App() {
  const [question, setQuestion] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0)
  useEffect(() => {
    getPreguntas().then((promis) => setQuestion(promis.results))
  }, [])

  function Pregunta({
    p = "Pregunta generica",
    incorrectAnswers,
    correctAnswer,
  }) {
    const allAnswers = [...incorrectAnswers, correctAnswer]
    function shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o
    }

    const PosibleAnswers = () => {
      return shuffle(allAnswers).map((e) => (
        <button className="button" key={e} onClick={nextQuestion}>
          {e.replace(/&quot;/g, "").replace(/&#039;/g, "")}
        </button>
      ))
    }
    return (
      <div className="Pregunta">
        <h3 className="Title">
          {p.replace(/&quot;/g, "").replace(/&#039;/g, "")}
        </h3>
        <PosibleAnswers className="answers"></PosibleAnswers>
      </div>
    )
  }

  const nextQuestion = () => {
    
    setQuestionNumber((anterior) => anterior + 1)
  }
  if (question[questionNumber] !== undefined) {
    return (
      <div>
        <Pregunta
          p={question[questionNumber].question}
          incorrectAnswers={question[questionNumber].incorrect_answers}
          correctAnswer={question[questionNumber].correct_answer}
          className={Pregunta}
        ></Pregunta>
      </div>
    )
  } else {
    return <h4>Loading...</h4>
  }
}

// return (
//   <div className="App">
//     <h1>My react App</h1>
//     <ListaPreguntas></ListaPreguntas>
//     {/* <hr></hr> */}
//     {/* <Componente id={2} edad={32}></Componente> */}
//     {/* <hr></hr> */}
//     {/* <Posts></Posts> */}
//   </div>
// )

export default App
