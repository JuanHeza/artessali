import React from 'react'
import "./header.css"
import Logo from '../img/logo.png'
import Banner from '../img/banner_artesanal.png'
import { Link } from "react-router-dom";
export class NavMenu extends React.Component{
    componentDidMount() {
        window.scrollTo(0, 0);
      }
    render(){
        return(
            <div className="navbar fixed">
                <ul className="navbar-menu flex row">
                    <Link to="productos"><li className="navbar-item">Productos</li></Link>
                    <Link to="cuarzos"><li className="navbar-item">Cuarzos</li></Link>
                    <Link to="/"><li className="navbar-logo"><img src={Logo} className="App-logo" alt="logo" /></li></Link>
                    <Link to="eventos"><li className="navbar-item">Eventos</li></Link>
                    <Link to="contacto"><li className="navbar-item">Contacto</li></Link>
                </ul>
            </div>
        )
    }
}
export class Header extends React.Component{
    render(){
        return(
            <header>
                <img src={Banner} alt="" />
            </header>
        )
    }
}