// import logo from './logo.svg';
import './App.css';
import {NavMenu, Header} from "./components/header"
import {Nosotros} from "./components/nosotros"
import {Products} from "./components/product-box"
import {Exposicion} from "./components/exposicion"
import {Eventos} from "./components/eventos"
import {Contacto} from "./components/contacto"
import {Stories} from "./components/stories"
import {Footer} from "./components/footer"
import {  
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <NavMenu />
          <Header />
              <Routes>
                <Route path="productos" element={<Products />} />
                <Route path="cuarzos" element={<Exposicion />} />
                <Route path="eventos" element={<Eventos />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="/" element={<Home />} />
              </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <>
      <Nosotros />
      <Stories />
      <Exposicion home={true}/>
      <Eventos home={true}/>
      <Contacto home={true}/>
    </>
  );
}

export default App;
