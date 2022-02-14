import "./Cuestionario.css"
import { useState, useEffect } from "react"
import getPreguntas from "./services/getPreguntas"

export default function Questionary() {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [question, setQuestion] = useState([])
  const [answers, setAnswer] = useState([])
  const [score, setScore] = useState(0)
  useEffect(() => {
    getPreguntas().then((promis) => setQuestion(promis.results))
  }, [])

  function Pregunta({
    p = "Pregunta generica",
    incorrectAnswers,
    correctAnswer,
  }) {
    const allAnswers = [...incorrectAnswers, correctAnswer]
    const nextQuestion = (event) => {
      setAnswer((ans) => [...ans, event.target.value])

      if (
        event.target.value ===
        correctAnswer.replace(/&quot;/g, "").replace(/&#039;/g, "")
      ) {
        setScore((scor) => scor + 1)
      }
      setQuestionNumber((anterior) => anterior + 1)
    }
    // Funcion Shuffle: Recibe un array y lo retorna con sus elementos en posiciones aleatorias
    function shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o
    }
    // Componente de la alternativa
    const Alternativa = ({ pAns }) => {
      return (
        <button
          key={pAns}
          value={pAns}
          onClick={nextQuestion}
          className="button"
        >
          {pAns.replace(/&quot;/g, "").replace(/&#039;/g, "")}
        </button>
      )
    }
    // Componenete que mapea las posibles respuestas de cada pregunta
    const PosibleAnswers = () => {
      return shuffle(allAnswers).map((possibleAnswer) => (
        <Alternativa key={possibleAnswer} pAns={possibleAnswer}></Alternativa>
      ))
    }
    // Retorno de componente Pregunta
    return (
      <div className="Pregunta">
        <h3 className="Title">
          {p.replace(/&quot;/g, "").replace(/&#039;/g, "")}
        </h3>
        <PosibleAnswers className="answers"></PosibleAnswers>
        <h4 className="QuestionNumber">{`Question ${
          parseInt(questionNumber) + 1
        } of ${parseInt(question.length)}`}</h4>
      </div>
    )
  }

  // Componente Review Answers: Componente de la pagina final para revisar alternativas
  const ReviewAnswers = () => {
    let i = -1
    return (
      <div>
        {question.map((quest) => {
          i += 1
          return (
            <div className="ReviewAnswer">
              <h5 className="rQuestion">{`${i + 1}. ${quest.question
                .replace(/&quot;/g, "")
                .replace(/&#039;/g, "")}`}</h5>
              {answers[i] === quest.correct_answer ? (
                <p className="rAnswer CorrectAns">{`${answers[i]} `}</p>
              ) : (
                <div>
                  <p className="rAnswer IncorrectAns">{`You answered Incorrectly`}</p>
                  <p className="rAnswer IncorrectAns">{answers[i]}</p>
                  <p className="rAnswer CorrectAns">{`${quest.correct_answer}`}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return question[questionNumber] !== undefined ? (
    <div>
      <Pregunta
        p={question[questionNumber].question}
        incorrectAnswers={question[questionNumber].incorrect_answers}
        correctAnswer={question[questionNumber].correct_answer}
        className={Pregunta}
      ></Pregunta>
    </div>
  ) : questionNumber === question.length && questionNumber !== 0 ? (
    <div>
      <h1 className="FinalScore">{`You got ${score} out of 10 correct!`}</h1>
      <h2>Review Your Answers!</h2>
      <ReviewAnswers></ReviewAnswers>
    </div>
  ) : (
    // Muestra el loading / Implementar spin
    <h4 className="Loading">Loading...</h4>
  )
}
