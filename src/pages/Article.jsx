import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article({articles}) {
  const { urlId } = useParams()
  //const history = useHistory()

  const navigate = useNavigate()

  const article = articles.find( ({ id }) => id === urlId);

  console.log("id: " + urlId)
  console.log(articles)

  if (!article) {
    setTimeout(() => {
      // history.goBack()
      //history.push('/')
      navigate('/');
    }, 2000)
  }

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  )
}
