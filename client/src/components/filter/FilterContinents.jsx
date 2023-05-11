
import { useDispatch, useSelector } from "react-redux";
import {filterByContient} from "../../redux/actions"
import style from "./Filter.module.css"
export const FilterContinents = () => {
    const continents = useSelector(state => state.continents)
    
    const continentsFilter = useSelector(state => state.activeFilters.continents)
    const dispatch = useDispatch()
   
    const handleInputChange = (event) => {
        dispatch(filterByContient(event.target.value))
       
    }
    return (
        <div className={style.contenedorGeneral}>
        <div className={style.contenedorTitulo}><span className={style.textoTitulo}>Contientes</span></div>
        <ul className={style.lista} onChange={handleInputChange}>
            {
            continents.map(continent =>  {
              return(
              <li>
                <input type="checkbox" id={continent} defaultChecked={continentsFilter.includes(continent)} value={continent}/>
                <label className={style.listaLabel} htmlFor={continent}>{continent}</label>
              </li>)
            })
            }
        </ul>
        </div>
    )

}

