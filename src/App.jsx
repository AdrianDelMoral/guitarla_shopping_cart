import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  // si no sabe sel estado inicial, inicializar con vacio/array vacio
  const [data, setData] = useState(db)
  
  /* // si no queremos utilizar dependencias, y fuese una api:
  const [data, setData] = useState([])
  useEffect(() =>{
    setData(db)
  }, []) */

  return (
    <>

      <Header/>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
              />
          ))}
          
        </div>
      </main>

        <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App