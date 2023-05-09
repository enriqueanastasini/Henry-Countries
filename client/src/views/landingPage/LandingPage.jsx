import React from "react"
import { Link } from "react-router-dom"
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={styles.landing}>
            <div className={styles.viajaapContainerPrincipal}>
            <div className={styles.viajaapContainer}>
                <div className={styles.palaneImgContainer}><img className={styles.palaneImg} src="https://cdn.icon-icons.com/icons2/38/PNG/512/takeoffavion_avion_4532.png" alt="" /></div> {/* Conseguir un icono de avion blanco */}
                <h1 className={styles.viajaapText}>VIAJAPP</h1>
                </div>
                </div>
            <div className={styles.contenedorPrincipal}>
                <div>
                    <h2 className={styles.disfruta}>DISFRUTA TUS</h2>
                    </div>
                <div >
                    <h1 className={styles.vacaciones}>VACACIONES</h1> {/*Cambiar la tipografía*/}
                </div>
                <div>
                <Link to="/home">
                    <button className={styles.loginButton} type="submit" value="LOGIN">LOGIN</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}