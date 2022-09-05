import React from 'react'
import { products,textos } from './variables'
import'./product-box.css'
export class Products extends React.Component{
    componentDidMount() {
        window.scrollTo(0, 0);
      }
      imageChange = (e) => {
          let src = e.currentTarget.getAttribute("data-img")
          let pic =  e.currentTarget.parentNode.parentNode.parentNode.querySelector("#picture")
          console.log(e.currentTarget.getAttribute("data-img"))
          pic.setAttribute("src", src)
        }
    render(){
        return(
            <section id="productos">
                <div className="sectionTitle">
                    <h1 dangerouslySetInnerHTML={{ __html: textos.productos }}></h1>
                </div>
                {products.map((cat, index) =>(
                    <article key={index} className="productRow flex column">
                        <h1 className="title">{cat.categoria}</h1>
                        {cat.secciones.map((sec, index) => (
                            <div key={index}>
                                <h2>{sec.titulo}</h2>
                                <div className="productScroll ">
                                    {sec.productos.map((item, index) => (
                                        <div className="productCard" key={index}>
                                            <div className="productImage">
                                                <img loading="lazy" id="picture" src={item.foto[0]} alt={item.nombre} />
                                                <div className={"flex ai-center jc-center badge "+ item.badge}> {item.badge}</div>
                                            </div>
                                            <h4 className="productName">{item.nombre}</h4>
                                            <h4 className="productPrice">{item.descripcion}</h4>
                                            <div className="productOptions">
                                            {item.foto.map((pic,id) => (
                                                <div className="productView" key={id}>
                                                    <img loading="lazy" src={pic} alt="option" data-img={pic} onMouseEnter={this.imageChange} onClick={this.imageChange} />
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </article>
                ))}
            </section>
        )
    }
}