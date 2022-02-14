import getPosts from "./services/getPosts"
import { useState, useEffect } from "react"
import "./postStyles.css"

export default function Posts() {
  const [post, setPosts] = useState([])
  const [newNote, setNewNote] = useState("")
  const handleChange = (event) => {
    setNewNote({
      id: post.length + 1,
      title: "Nueva nota ;)",
      body: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (newNote.body !== undefined) {
      setPosts((oldPosts) => [...oldPosts, newNote])
    } else {
      console.log("Debe ingresar nota ")
    }
  }
  const [loading, setLoading] = useState(false)
  // se guarda en el hook
  useEffect(() => {
    setLoading(true)
    getPosts().then((posts) => {
      setPosts(posts)
      setLoading(false)
    })
  }, [])
  // Se hace el map
  return (
    <div className="postMainContainer">
      <div className="postAdder">
        <h3>Ingrese Nueva Nota</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Ingrese contenido"
          ></input>
          <button>Create</button>
        </form>
      </div>
      <div className="postContainer">
        {post.map((e) => (
          <div key={e.id} className="post">
            {loading ? "Cargando..." : ""}
            <div>
              <h3> Id Nota</h3>
              <strong>{e.id}</strong>
              <hr></hr>
              <h4>{e.title}</h4>
              <p>{e.body}</p>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
