'use client';
import customReactQuery from '../../components/useReactQuery';

export default function Axi(){

    const [comments, error, loading] = customReactQuery('https://jsonplaceholder.typicode.com/comments');

    if(error){
        return <h1>Something went wrong</h1>
    }

    if(loading){
        return <h1>loading ... </h1>
    }

    return(
        <div>
        <h2>Number of comments:{comments.length}</h2>
              <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Body:</strong> {item.body}</p>
          </li>
        ))}
      </ul>
        </div>
    )
}


