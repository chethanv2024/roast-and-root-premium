import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const CartContext = createContext(null)
const readCart = () => {
  try { return JSON.parse(localStorage.getItem('rr-cart') || '[]') } catch { return [] }
}
export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  useEffect(() => { localStorage.setItem('rr-cart', JSON.stringify(items)) }, [items])
  const addToCart = (product, quantity = 1) => setItems(current => {
    const found = current.find(item => item.id === product.id)
    return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }]
  })
  const removeFromCart = id => setItems(current => current.filter(item => item.id !== id))
  const changeQuantity = (id, quantity) => setItems(current => quantity < 1 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity } : item))
  const clearCart = () => setItems([])
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, addToCart, removeFromCart, changeQuantity, clearCart, itemCount, subtotal }), [items, itemCount, subtotal])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
