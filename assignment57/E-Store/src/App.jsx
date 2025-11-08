// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import ProductList from './Components/ProductList';
// import ProductDetail from './Pages/ProductDetail';
// import Navbar from './Components/Navbar';
// import Sidebar from './Components/Sidebar';
// import { CartProvider } from './Context/CartContext';
// import Home from './Pages/Home';
// import Products from './Pages/Products';
// import About from './Pages/About';
// import Contact from './Pages/Contact';
// import Footer from './Components/Footer';
// import { AuthProvider } from './Context/AuthContext';
// // import MigrationTool from './Components/MigrationTool'; 

// function App() {
//   return (
//     <AuthProvider>
//     <CartProvider>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <Sidebar />
//         <div className="">
//           <Routes>
//             <Route path='/' element={<Home />}/>
//             <Route path='/products' element={<Products />}/>
//             <Route path='/about' element={<About />} />
//             <Route path='/contact' element={<Contact />}/>
//             <Route path="/product/:id" element={<ProductDetail />} />
//             {/* <Route path="/migrate" element={<MigrationTool />} />  */}
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;












import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductDetail from './Pages/ProductDetail';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import UserProfile from './Pages/UserProfile';
import Orders from './Pages/Orders';
import Checkout from './Pages/Checkout';
import OrderDetail from './Pages/OrderDetail';
import Wishlist from './Pages/Wishlist';


function AppContent() {
  const location = useLocation();
  
  // Hide navbar and footer on auth pages
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <Sidebar />}
      
      <div className="flex-grow">
        <Routes>
          {/* Public Routes - Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
  <ProtectedRoute>
    <UserProfile />
  </ProtectedRoute>
} />
          <Route path='/products' element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }/>
          
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          
          <Route path='/contact' element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }/>
          
          <Route path="/product/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
  <ProtectedRoute>
    <Orders />
  </ProtectedRoute>
} />

<Route path="/orders/:id" element={
  <ProtectedRoute>
    <OrderDetail />
  </ProtectedRoute>
} />

<Route path="/checkout" element={
  <ProtectedRoute>
    <Checkout />
  </ProtectedRoute>
} />

<Route path="/wishlist" element={
  <ProtectedRoute>
    <Wishlist />
  </ProtectedRoute>
} />
        </Routes>
        
      </div>
      
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;