import React from "react";
import "./exposicion.css"
import { Link } from "react-router-dom";
import { piedras, textos } from "./variables";
export class Exposicion extends React.Component{
    componentDidMount() {
        window.scrollTo(0, 0);
      }
    render(){
        let list = []

        this.props.home ? list = piedras.slice(0,8) : list = piedras
        return(
            <section id="exposicion" className="flex row wrap">
                <div className="sectionBanner">
                    <h2 className="intro">{textos.exposicion}</h2>
                </div>
                {list.map((item)=>(
                    <div key={item.nombre} className="exposeProduct flex column jc-between ai-center">
                        <div className="exposeWindow">
                            <img  loading="lazy" src={item.imagen} alt={item.nombre} className="exposeImage" />
                        </div>
                        <div className="exposeText">
                            <h2 className="title">{item.nombre}</h2>
                        </div>
                    </div>
                ))}
                {this.props.home &&  <Link to="cuarzos">
                    <div className="sectionButton">Descubre nuestros Cuarzos</div>
                </Link>}
                {!this.props.home && 
                    <p className="footer">Sin embargo no deben considerarse la única opción ni reemplazar tratamientos médicos o psicológicos.</p>
                }
            </section>
        )
    }
}