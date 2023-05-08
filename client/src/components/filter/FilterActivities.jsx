import { useDispatch, useSelector } from "react-redux";
import { filterByActivities } from "../../redux/actions";
import style from "./Filter.module.css"
export const FilterActivities = () => {
    const activities = useSelector(state => state.activities)
    const activitiesFilter = useSelector(state => state.activeFilters.activities)
    const dispatch = useDispatch()
    const handleInputChange = (event) => {
        console.log(event.target.value)
        dispatch(filterByActivities(event.target.value))
    }

    return (
        <div className={style.contenedorGeneral}>
         <div className={style.contenedorTitulo}><span className={style.textoTitulo}>Actividades</span></div>
          <ul className={style.lista} onChange={handleInputChange}>
            {
            activities.map(activity =>  {
              return(
              <li>
                <input type="checkbox" id={activity.activity_id} defaultChecked={activitiesFilter.includes(activity.activity_id)} value={activity.activity_id}/>
                <label className={style.listaLabel} htmlFor={activity.activity_id}>{activity.name}</label>
              </li>)
            })
            }
        </ul>
        </div>
    )

}