import { BrowserRouter as Router , Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductCreationPage from "./pages/ProductCreationPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import EditCarPage from "./pages/EditCarPage";
function App() {
  return (
   <Router>
    <Navbar/>
      <Routes>
           <Route path="/" element={<LoginPage></LoginPage>}/>
           {/* <Route path="/docs" element={<LoginPage></LoginPage>}/> */}
           <Route path="/products" element={<ProductListPage />} />
           <Route path="/products/new" element={<ProductCreationPage />}/>
           <Route path="/products/:id" element={<ProductDetailPage />} />
           <Route path="/signup" element={<SignupPage/>}/>
           <Route path="/edit/:id" element={<EditCarPage/>}/>
      </Routes>
   </Router>
  );
}

export default App;
