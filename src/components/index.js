import StoreHeader from '@/components/header/Header'
import HeaderCart from '@/components/header/HeaderCart'
import HeaderNavBtn from '@/components/header/HeaderNavBtn'
import HomeSlider from '@/components/home/Slider'
import ProductCard from '@/components/product/Card'

const Components = [
  // Global layout
  { name: 'store-header', template: StoreHeader },

  // Header
  { name: 'header-cart', template: HeaderCart },
  { name: 'header-nav-btn', template: HeaderNavBtn },

  // Home
  { name: 'home-slider', template: HomeSlider },
  { name: 'product-card', template: ProductCard }
]

export default Components
