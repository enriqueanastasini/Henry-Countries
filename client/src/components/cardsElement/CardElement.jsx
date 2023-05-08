import { Link } from "react-router-dom"
import style from "./CardElement.module.css"

export default function CardsElement({country}) {
    const { id, name, continent, population} = country
    return(
        
        <Link className={style.link} to={`/details/${id}`}>
            <div className={style.cardContainer}> 
                <div className={style.contenedorNombre}>
                    <h2 className={style.textoNombre}>{name}</h2>
                </div>
                <div className={style.contenedorContinente}><p>{continent}</p></div>
                <div className={style.contenedorPoblacion}><p>{population}</p></div>
                <div className={style.contenedorImg}>
                    <img 
                        style={{height: 50}} 
                        src={country.flag[0]} 
                        alt={`${country.name} flag`}
                        />
                </div>
                    
            </div>
        </Link>
    )
}