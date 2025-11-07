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
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './Components/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useAuth } from './Context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/products' element={<Products />}/>
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />}/>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes (for future use) */}
              {/* <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;