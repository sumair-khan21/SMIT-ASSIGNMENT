import AllProducts from './Components/AllProducts'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Categories from './Components/Categories'
import FeaturedProducts from './Components/FeaturedProducts'
import Features from './Components/Features'
import Testimonials from './Components/Testimonials'
import Newsletter from './Components/Newsletter'
import Footer from './Components/Footer'
import CartSidebar from './Components/CartSidebar'
import CartSaveIndicator from './Components/CartSaveIndicator'
import ScrollToTop from './Components/ScrollToTop'
// import Todo from './Components/Todo'

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Features />
      <Testimonials />
      <Newsletter />
      
      {/* AllProducts section - currently not in use */}
      {/* <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-12 px-4">
        <AllProducts />
      </div> */}

      <Footer />
      <CartSidebar />
      <CartSaveIndicator />
      <ScrollToTop />
    </>
  )
}

export default App
