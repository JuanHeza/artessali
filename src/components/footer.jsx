import React from "react";
import "./footer.css"
import { textos } from "./variables";
export class Footer extends React.Component{
    render(){
        return(
            <footer>
                <h3>{textos.footer}</h3>
                <div className="redes flex">
                    <a target="_blanck" rel="noreferrer" href={textos.facebook}><img src="img/facebook.png" alt="" /></a>
                    <a target="_blanck" rel="noreferrer" href={textos.tiktok}><img src="img/tiktok.png" alt="" /></a>
                    <a target="_blanck" rel="noreferrer" href={textos.instagram}><img src="img/instagram.png" alt="" /></a>
                    <a target="_blanck" rel="noreferrer" href={textos.whatsapp}><img src="img/whatsapp.png" alt="" /></a>
                    <a target="_blanck" rel="noreferrer" href={textos.correo}><img src="img/mail.png" alt="" /></a>
                </div>
              <div className="col-md-12 LWD-col"> 
                <span className="copyright">
                    Copyright &copy; 2021. Developed by 
                    <a>
                        Evil Panda
                    </a>
                </span> 
              </div>

            </footer>
        )
    }
}
