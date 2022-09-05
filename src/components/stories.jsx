import React from "react";
import "./stories.css"
import { textos, destacados } from "./variables";
import { Link } from "react-router-dom";

export class Stories extends React.Component{
    constructor(props) {
        super(props);
        this.state = {text: "", image: "", display: "none",
        style: {opacity: 0, transform: "scale(0)"}};

        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
        this.hide = this.hide.bind(this);
    }
    handleClick(input,image) {
        this.setState({
          text: input,
          image: image,
          display:"flex",
          style:  {opacity: 1, transform: "scale(1)"}
        });
        console.log(this.state.text)
      }
      hide() {
          this.setState({
              display: "none",
            style: {opacity: 0, transform: "scale(0)"}
          });
        }
    render(){
        return(
            <section id="stories">
                <div className="stories flex row">
                    {destacados.map((item) => (
                        <div key={item.titulo} className="story flex column" onClick={this.handleClick.bind(this, item.text, item.image)}>
                            <img src={item.image} alt={item.titulo} />
                        </div>
                    ))}
                </div>
                <p className="storyText"  dangerouslySetInnerHTML={{ __html: textos.productos }}></p>
                <div id="myModal" className="modal" style={{ display: this.state.display }}>
                    <div className="modal-content" style={this.state.style} >
                        <span className="close" onClick={this.hide}>&times;</span>
                        <img src={this.state.image} alt="" className="bigStory" />
                        <p>{this.state.text}</p>
                    </div>
                </div>
                <Link to="productos">
                    <div className="sectionButton">Conoce nuestros productos</div>
                </Link>
            </section>
        )
    }
}