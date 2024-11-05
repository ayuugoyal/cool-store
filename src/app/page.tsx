'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import ProductShowcase from '@/components/ProductShowcase'
import AboutSection from '@/components/AboutSection'
import { getProducts } from '@/lib/api'
import { Product } from '@/types'

export default function Home() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prevCart) => [...prevCart, product])
  }

  useEffect(() => {
    const Products = async () => {
      const products = await getProducts()
      setProducts(products)
    }
    Products()
  }, [])
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <Navbar cartItems={cartItems} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ProductShowcase products={products} addToCart={addToCart} />
        <AboutSection />
      </main>
    </div>
  )
}
