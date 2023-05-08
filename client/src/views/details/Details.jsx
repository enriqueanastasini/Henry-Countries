
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { consultaPaisId, limpiarPais } from "../../redux/actions"
import style from "./Details.module.css"

//Inculir los datos faltantes
//Estilar

export default function Details() {
    const { id } = useParams()
    const country= useSelector(state=> state.country)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(consultaPaisId(id))
        return ()=>dispatch(limpiarPais()) 
    },[])
    
    return(
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorDetailActivities}>
                <div className={style.contenedorDetail}>
                    <div className={style.contenedorHeader}>
                        <h2>{`${country.name}, ${country.id}`}</h2>
                        <img src={country.flag ? country.flag[0] : ""} alt="" />
                    </div>
                    <div className={style.contenedorCountryData}>
                        <label className={style.label}>Capital: </label><h3>{country.capital_city}</h3>
                    </div>
                    <div className={style.contenedorCountryData}>
                        <label className={style.label}>Contiente: </label><h3>{country.continent}</h3>
                    </div>
                    <div className={style.contenedorCountryData}>
                        <label className={style.label}>Región: </label><h3>{country.subregion}</h3>
                    </div>
                    <div className={style.contenedorCountryData}>
                        <label className={style.label}>Area: </label><h3>{country.area}</h3>
                    </div>
                    <div className={style.contenedorCountryData}>
                        <label className={style.label}>Población: </label><h3>{country.population} personas</h3>
                    </div>
                </div>
                <div className={style.contenedorActivities}>
                     <div className={style.contenedorTitles}>   
                        <label className={style.titleName}>Actividad</label>
                        <label className={style.titleTemporada}>Temporada</label>
                        <label className={style.titleDificultad}>Dif.</label>
                        <label className={style.titleDuración}>Dur.</label>
                     </div>   
                    {country.activities?.map(activity=> (
                        <div className={style.contenedorActivity}>
                        <label className={style.labelNameAct}>{activity.name}</label>
                        <label className={style.labelSeasonAct}>{activity.season}</label>
                        <label className={style.numbers}>{activity.difficulty}</label>
                        <label className={style.numbers}>{activity?.duration}</label>
                    </div>
                    ))}
                    
                </div>
                    <Link className={style.crossHome} to="/home">X</Link>
            </div>
        </div>
    )
}