import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  /* // si no queremos utilizar dependencias, y fuese una api:
  const [data, setData] = useState([])
  useEffect(() =>{
    setData(db)
  }, []) */

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] // almacenará en el localStorage el carrito vacio o si tiene items, los items
  }

  // si no sabes el estado inicial, inicializar con vacio/array vacio
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)) // Cada vez que el carrito cambie, se encargará useEffect de actualizar el carrito
  }, [cart])
  
  function addToCart(item) {
    //? Inmutabilidad en react / State inmutable: que no puede cambiarse, si se ha de trabajar con un array, se debe duplicar y modificar

    //* Comprobar si existe el elemento uno en el array igual
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id) // Dará 0 si existe, -1 si no existe
    //* Prevenir que se agrege de nuevo en el array
    if(itemExists >= 0){ // Existe en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return // si no es mayor o igual a la cantidad, incrementará las cantidades desde el botón del item
      const updatedCart = [...cart]
      //* Añadirá si existe, más cantidades de ese item
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart(prevCart => [...prevCart, item])    
    }
  }

  function removeFromCart(id) {
    console.log(`Eliminando..., ${id}`);
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // devolverá las guitarrá diferentes a la que hemos seleccionado
  }
  function decreaseQuantity(id) {
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS) {
            return{
                ...item, 
                quantity: item.quantity - MIN_ITEMS
          }
        }
        return item
      })
      setCart(updatedCart)
  }

  function increaseQuantity(id) {
    
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return{
          ...item, 
          quantity: item.quantity + 1
        }
      }
      return item
    })
    
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
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