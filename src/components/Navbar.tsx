'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Minus, Plus, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'


import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'

export default function Navbar({ cartItems }: { cartItems: Product[] }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/#products' },
    { name: 'About', path: '/#about' },
  ]

  const totalItems = cartItems.reduce((sum, item) => sum + (1), 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (1), 0)


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-800">
              Cool Store
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.path ? 'bg-purple-100' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    You have item{cartItems.length !== 1 ? 's' : ''} in your cart.
                  </SheetDescription>
                </SheetHeader>
    <div className="mt-8 flex flex-col h-full">
                  <ScrollArea className="flex-grow">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center py-4">
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md" />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium text-sm">{item.title}</h3>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-2 font-medium">{1}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                  <div className="mt-auto">
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center font-medium">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      Checkout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}