import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { supabase } from './client'
import { AddCreator, EditCreator, ShowCreators, ViewCreator } from './pages'
import './App.css'

function App() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    
    const fetchCreators = async () => {
      const { data, error } = await supabase
      .from('creators')
      .select('*')
      if (error) {
        console.log(error)
      }
      setCreators(data)
    }

    fetchCreators()
  }, [])

  let element = useRoutes([
    {
      path: "/",
      element:<ShowCreators data={creators}/>
    },
    {
      path:"/edit/:id",
      element: <EditCreator data={creators} />
    },
    {
      path:"/new",
      element: <AddCreator />
    },
    {
      path: "/:id",
      element: <ViewCreator data={creators} />
    }
  ])

  return (
    <>
       <div className="App">
        <header>
          <h1>Creatorverse</h1>
          <nav>
            <ul>
              <li><a href="/" role="button">View All Creators</a></li>
              <li><a href="/new" role="button">Add a Creator</a></li>
            </ul>
          </nav>
        </header>
        <main> {element} </main>
        </div>
    </>
  )
}

export default App
