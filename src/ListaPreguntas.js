import Pregunta from "./Pregunta"
import getPreguntas from "./services/getPreguntas"
import { useState, useEffect } from "react"

export default function Preguntas() {
  const [question, setQuestion] = useState([])
  useEffect(() => {
    getPreguntas().then((promis) => setQuestion(promis.results))
  }, [])
  return (
    <div>
      {question.map((quest) => {
        return (
          <Pregunta
            key={quest.question}
            p={quest.question}
            incorrectAnswers={quest.incorrect_answers}
            correctAnswer={quest.correct_answer}
          ></Pregunta>
        )
      })}
    </div>
  )
}
