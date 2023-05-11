import CardsElement from "../cardsElement/CardElement"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,  } from "react"
import { setPagina } from "../../redux/actions";
import style from "./CardsContainer.module.css"
import { ordenAlfabeticoPaises, ordenHabitantesPaises } from "../../redux/actions";
import { filters } from "./Filters";
import { usePaginated } from "./Paginated";

export default function CardsContainer() {
    const { activities: activitiesList , paginado, pagina, chargeCountries, paginas, activeFilters} = useSelector((state => state)) //como saco el charge countries?
    let countriesReserve = useSelector((state => state.countriesReserve)) 
    const [actualPage, setActualPage] = useState([])
    const [actualPageList, setActualPageList] = useState([])
    
    //Filtrado
    const dispatch = useDispatch()
    const {
        continents: continentsFilter,
        activities: activitiesFilter,
        order: orderFilter,
        name: nameFilter,
    } = activeFilters
        //continentsFilter, activitiesFilter, orderFilter, nameFilter, activities, countriesReserve
    
    useEffect(()=>{
        filters(continentsFilter, activitiesFilter, orderFilter, nameFilter, activitiesList, countriesReserve, dispatch)
    }, [activeFilters, chargeCountries])
    
    
    //Si todavía no cargo la info poner cargando..
    usePaginated(setActualPage, paginado, pagina, setActualPageList, paginas, dispatch)
    
    // Handlers de botones se podrian poner en los botones exvepto el select
    const nextPage = () => {
        if(pagina < paginado.length-1)
        dispatch(setPagina(pagina + 1))
    }
    const prevPage = () => {
        if (pagina > 0){
        dispatch(setPagina(pagina - 1))}
    }

    return(
        <>
            <h1 style={{"marginBlockEnd": "12px"}}>Lista de Paises</h1>
            <div className={style.contenedorTitulos}>
                <div className={style.nameContainer}><label className={style.name} onClick={() => dispatch(ordenAlfabeticoPaises())}>Nombre <div className={style.flechitaFiltro}></div></label></div> 
                <div className={style.continente}><label >Continente</label></div>
                <div ><label className={style.poblacion} onClick={() => dispatch(ordenHabitantesPaises())} > Población <div className={style.flechitaFiltro}></div></label></div>
            </div>
            <div className={style.contenedor2Cards}>
                {actualPage?.map(country => <CardsElement id={country.id} country={{...country}}/>)}
            </div>    
            <div className={style.paginationContainer}>
                <input type="submit" onClick={prevPage} value="Página Anterior"/>
                {actualPageList?.map(p => <p 
                id={p} 
                className={p===pagina ? style.paginaActual: style.pagina} 
                onClick={ (e) => dispatch(setPagina(parseInt(e.target.id)))}
                >{p}
                </p>)}
                <input type="submit" onClick={nextPage} value="Próxima Página"/>
            </div>
        </>
    )
}

