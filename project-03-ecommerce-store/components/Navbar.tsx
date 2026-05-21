'use client'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/products" className="text-xl font-extrabold tracking-tight text-gray-900">
          Shop<span className="text-indigo-600">Next</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Catalogue
          </Link>
          <Link href="/products?category=Vêtements" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Vêtements
          </Link>
          <Link href="/products?category=Électronique" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Électronique
          </Link>
          <Link href="/products?category=Sport" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Sport
          </Link>
          <Link href="/products?category=Maison" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Maison
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-gray-500 hover:text-gray-900 transition-colors">
            <Search size={20} />
          </button>
          <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors">
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 animate-fadeIn">
          {['Catalogue', 'Vêtements', 'Électronique', 'Sport', 'Maison'].map((item) => (
            <Link
              key={item}
              href={item === 'Catalogue' ? '/products' : `/products?category=${item}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
