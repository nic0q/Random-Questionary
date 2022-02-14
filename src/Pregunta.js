import "./Pregunta.css"
export default function Pregunta({
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
      <button className="button" key={e}>{e.replace(/&quot;/g, '').replace(/&#039;/g, '')}</button>
    ))
  }
  return (
    <div className="Pregunta">
      <h3 className="Title">{p.replace(/&quot;/g, '').replace(/&#039;/g, '')}</h3>
      <PosibleAnswers className="answers"></PosibleAnswers>
    </div>
  )
}
