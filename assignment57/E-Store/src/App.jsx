import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { CartProvider } from './Context/CartContext';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Sidebar />
        <div className="">
          <Routes>
            <Route path='/' element={<Home />}/>
            {/* <Route path="/" element={<ProductList />} /> */}
            <Route path='/products' element={<Products />}/>
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />}/>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
