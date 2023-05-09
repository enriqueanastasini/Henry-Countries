//Pedirle a la Api Los paises
//Contener a las cards que se deben ver en pantalla
import CardsElement from "../cardsElement/CardElement"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,  } from "react"
import { setFilteredCountries, setPagina, setPaginado } from "../../redux/actions";
import style from "./CardsContainer.module.css"
import { ordenAlfabeticoPaises, ordenHabitantesPaises } from "../../redux/actions";
import { ORDEN_ALFABETICO_PAISES, ORDEN_HABITANTES_PAISES } from "../../redux/action-types";
import { filters } from "./Filters";


export default function CardsContainer() {
    // // Estados de Redux
    // const countries = useSelector((state => state.countries)) --> creo que el estado countries no lo uso nunca
    const actividades = useSelector((state => state.activities)) 
    let countriesReserve = useSelector((state => state.countriesReserve)) 
    const paginado = useSelector((state => state.paginado)) 
    const pagina = useSelector((state => state.pagina)) 
    const chargeCountries = useSelector((state => state.chargeCountries)) 
    const [actualPage, setActualPage] = useState([])
    
    //Filtrado
    const activeFilters = useSelector(state => state.activeFilters)
    const dispatch = useDispatch()
    const {
        continents,
        activities,
        order,
        name
    } = activeFilters
    useEffect(()=>{
        filters(continents, activities, order, name, actividades, countriesReserve, dispatch, setFilteredCountries, setPaginado)
    }, [activeFilters,chargeCountries])
    
    //Paginado
    useEffect(()=> {
        setActualPage(()=>{
            return paginado[pagina]})
    },[paginado,pagina])
     
    const nextPage = () => {
        if(pagina < paginado.length-1)
        dispatch(setPagina(pagina + 1))
    }
    const prevPage = () => {
        if (pagina > 0){
        dispatch(setPagina(pagina - 1))}
    }

    const handleSelect = (event) => {
      switch(event.target.id) {
        case ORDEN_ALFABETICO_PAISES: //Este filtro se va cuando cambias de pestaña eso pasa porque toma un change del input y vuelve a hacer una request al servidor
            dispatch(ordenAlfabeticoPaises())
        break;
        case ORDEN_HABITANTES_PAISES:
            dispatch(ordenHabitantesPaises())
        break
        default:
            break
      }  
    }

    return(
        <>
            <h1 style={{"margin-block-end": "12px"}}>Lista de Paises</h1>
            <div className={style.contenedorTitulos}>
                <div className={style.nameContainer}><label className={style.name} id={ORDEN_ALFABETICO_PAISES} onClick={handleSelect}>Nombre <div className={style.flechitaFiltro}></div></label></div> 
                <div className={style.continente}><label >Continente</label></div>
                <div ><label className={style.poblacion} id={ORDEN_HABITANTES_PAISES} onClick={handleSelect} > Población <div className={style.flechitaFiltro}></div></label></div>
            </div>
            <div className={style.contenedor2Cards}>
                {actualPage?.map(country => <CardsElement country={{...country}}/>)}
            </div>    
            <div>
            <input type="submit" onClick={prevPage} value="Página Anterior"/>
            <input type="submit" onClick={nextPage} value="Próxima Página"/>
            </div>
        </>
    )
}

