const url = "https://opentdb.com/api.php?amount=10&category=18"

export default function getPreguntas() {
  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      return json
    })
}
