const url = "https://jsonplaceholder.typicode.com/posts"
// fetch, funcion que retorna una pronesa, a tal respuesta se le aplica formato json q tmb es promesa
export default function getPosts() {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    
}
