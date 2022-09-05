import React from 'react'
import { textos } from './variables'
import Logo from '../img/logo_redondo.jpg'
import "./nosotros.css"
export class Nosotros extends React.Component{
    render(){
        return(
            <section id="nosotros">
                <h2 className="lema">{textos.titulo}</h2>
                <div className="flex row">
                    <img src={Logo} alt="" />
                    <p className="intro"  dangerouslySetInnerHTML={{ __html: textos.intro}}></p>
                </div>
                <h2 className="lema">{textos.lema}</h2>
            </section>
        )
    }
}