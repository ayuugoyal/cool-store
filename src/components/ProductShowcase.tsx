'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ProductShowcaseProps {
  products: Product[]
  addToCart: (product: Product) => void
}

export default function ProductShowcase({ products, addToCart }: ProductShowcaseProps) {
  const [category, setCategory] = useState<string | null>(null)

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products

  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <section className="mb-12" id="products">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Featured Products</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={category === null ? "default" : "outline"}
          onClick={() => setCategory(null)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
                width={400}
                height={400}
              />
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <Badge variant="secondary">{product.category}</Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}