import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  /* // si no queremos utilizar dependencias, y fuese una api:
  const [data, setData] = useState([])
  useEffect(() =>{
    setData(db)
  }, []) */

  // si no sabes el estado inicial, inicializar con vacio/array vacio
  const [data, setData] = useState(db)
  
  const [cart, setCart] = useState([])
  
  function addToCart(item) {
    //? Inmutabilidad en react / State inmutable: que no puede cambiarse, si se ha de trabajar con un array, se debe duplicar y modificar

    //* Comprobar si existe el elemento uno en el array igual
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id) // Dará 0 si existe, -1 si no existe
    //* Prevenir que se agrege de nuevo en el array
    if(itemExists >= 0){ // Existe en el carrito
      const updatedCart = [...cart]
      //* Añadirá si existe, más cantidades de ese item
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart(prevCart => [...prevCart, item])    
    }
  }

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
                setCart={setCart}
                addToCart={addToCart}
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