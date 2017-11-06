import StoreHeader from '@/components/header/Header'
import StoreNav from '@/components/navigation/Navigation'

import HeaderCart from '@/components/header/HeaderCart'
import HeaderNavBtn from '@/components/header/HeaderNavBtn'
import HomeSlider from '@/components/home/Slider'
import AddToCart from '@/components/home/AddToCart'
import ProductCard from '@/components/product/Card'
import CartProductCard from '@/components/product/CartCard'

const Components = [
  // Global layout
  { name: 'store-header', template: StoreHeader },
  { name: 'store-nav', template: StoreNav },

  // Header
  { name: 'header-cart', template: HeaderCart },
  { name: 'header-nav-btn', template: HeaderNavBtn },

  // Home
  { name: 'home-slider', template: HomeSlider },
  { name: 'product-card', template: ProductCard },
  { name: 'add-to-cart', template: AddToCart },

  // Cart
  { name: 'cart-product-card', template: CartProductCard }
]

export default Components
