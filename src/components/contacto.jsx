import React from "react";
import axios from 'axios';
import "./contacto.css"
import { Link } from "react-router-dom";
import { textos, galeria } from "./variables";

export class Contacto extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre: "", 
            email: "", 
            telefono: "",
            mensaje: ""
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleSubmit = (event) =>{
        console.log('A name was submitted: ' + this.state.nombre, this.state.email, this.state.telefono, this.state.mensaje);
        axios.post('/ContactoBot', {
            nombre: this.state.nombre,
            correo: this.state.email,
            mensaje: this.state.mensaje,
            telefono: this.state.telefono,      
        })
          .then(function (response) {
            console.log(response);
            alert("Su informacion ha sido recibida con exito")
          })
          .catch(function (error) {
              alert("Hubo un error en el servidor")
            console.log(error);
          });
        this.setState({
            nombre: "", 
            email: "", 
            telefono: "",
            mensaje: ""
        })
        event.preventDefault();
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    render(){
        let sets = []
        var i,j, temporary, qt=2
        
        for (i = 0,j = galeria.length; i < j; i += qt) {
            temporary = galeria.slice(i, i + qt);
            sets.push(temporary);
        }

        return(
            <section id="contact" >
                    <h2 dangerouslySetInnerHTML={{ __html: textos.contacto }} />
                {this.props.home && 
                <>
                <div className="gallery flex row">
                    {sets.map((index, box) => (
                    <div className="pictureBox flex row" key={index}>
                        <div className="picture">
                            <img src={box[0]} alt="" className="" />
                            <img src={box[1]} alt="" className="" />
                        </div>
                    </div>
                    ))}
                </div>
                    <Link to="contacto">
                        <div className="sectionButton">Contactános</div>
                    </Link>
                </>
                }
                {!this.props.home && 
                <section className="contactSection">
                    <form action="/ContactoBot" method="POST"  onSubmit={this.handleSubmit} className="flex row wrap">
                        <label htmlFor="nombre" className="formTitle">Nombre</label>
                        <input type="text" name="nombre" id="nombre" placeholder="" pattern="^[a-zA-Z ]*$" title="Ingrese solo texto." required value={this.state.nombre} onChange={this.handleChange}/>

                        <label htmlFor="correo" className="formTitle">Correo</label>
                        <input type="email" name="email" id="correo" placeholder="" pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$" title="Ejemplo: usuario@correo.com" required value={this.state.email} onChange={this.handleChange}/>

                        <label htmlFor="tel" className="formTitle">Telefono</label>
                        <input type="tel" name="telefono" id="tel" placeholder="" pattern="^[0-9]*$" title="Ingrese los 10 digitos sin espacios" required value={this.state.telefono} onChange={this.handleChange}/>

                        <label htmlFor="msg" className="formTitle">Mensaje</label>
                        <textarea name="mensaje" id="msg" rows="5" placeholder="" pattern="" title="" required value={this.state.mensaje} onChange={this.handleChange}></textarea>

                        {/* <input type="reset" value="Limpiar" /> */}
                        <input type="submit" value="Enviar" />
                    </form>
                    <div className="contact flex row wrap">
                        <h3>Ubicanos en nuestras diferentes redes sociales</h3>
                        <a target="_blanck" rel="noreferrer" href={textos.facebook}><img src="img/facebook.png" alt="" /></a>
                        <a target="_blanck" rel="noreferrer" href={textos.tiktok}><img src="img/tiktok.png" alt="" /></a>
                        <a target="_blanck" rel="noreferrer" href={textos.instagram}><img src="img/instagram.png" alt="" /></a>
                        <a target="_blanck" rel="noreferrer" href={textos.whatsapp}><img src="img/whatsapp.png" alt="" /></a>
                        <a target="_blanck" rel="noreferrer" href={textos.correo}><img src="img/mail.png" alt="" /></a>
                        <h5>{textos.ubicacion}</h5>
                    </div>
                </section >
                }
            </section>
        )
    }
}