import React from "react";
import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
export default function NavBar() {

    return(
        <div className={style.nav}>
            <input type="checkbox" className={style.navcheck}/>
            <div className={style.navheader}>
                <div className={style.navtitle}>
                    VIAJAPP
                </div>
            </div>

            <div className={style.navbtn}>
                <label className={style.navcheck} htmlFor="navcheck">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
        
            <div className={style.navlinks}>
                <Link className={style.link} to="/home">Inicio</Link>
                <Link className={style.link} to="/form">Crear</Link>
                <Link className={style.link} to="/">Salir</Link>
            </div>
        </div>

    )
}

