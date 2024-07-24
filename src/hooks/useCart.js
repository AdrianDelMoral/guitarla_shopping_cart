//* Se pone js para poder tener la logica del componente
//! Se pone por convención de react par los customHooks
import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    //?  Si hay diferentes variables o tienes solo una variable,
    //?  se harán en el return, y se accede con 
    //?  "const { nombre } = useNombre()"
    //? return {
    //?     
    //? }

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

    // State Derivado
    // true si está vacio / false si está con items
    const isEmpty = useMemo(() => cart.length === 0, [cart]) 
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    // Las funciones que vamos a utilizar o queremos utilizar en otros componentes
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}