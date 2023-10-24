import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import { ProfileAndItem } from './components/profileAndItem';
import { ProfileAndListings } from './components/profileAndListings';


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profileanditem/:userId/:itemId" element={<ProfileAndItem />} />
            <Route path="/profileandlistings/:userId" element={<ProfileAndListings />} />
            <Route path="/logout" element={<h1>Product Logout Component</h1>} />
            <Route path="/profile" element={<h1>Product Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

//npm start