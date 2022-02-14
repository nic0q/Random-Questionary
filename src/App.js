import "./App.css"
import ListaPreguntas from "./ListaPreguntas"
import Pregunta from "./Pregunta"
import getPreguntas from "./services/getPreguntas"
import { useState, useEffect } from "react"

function App() {
  const [question, setQuestion] = useState([])
  useEffect(() => {
    getPreguntas().then((promis) => setQuestion(promis.results))
  }, [])
  let i = 0
  return (
    <div>
      {question.map((quest) => {
        i = i + 1
        console.log(i)
        return (
          <Pregunta
            key={i}
            p={quest.question}
            incorrectAnswers={quest.incorrect_answers}
            correctAnswer={quest.correct_answer}
          ></Pregunta>
        )
      })}
    </div>
  )
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
}

export default App
