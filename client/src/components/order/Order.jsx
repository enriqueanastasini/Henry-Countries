import { useDispatch, useSelector } from "react-redux";
import { ordenAlfabeticoPaises, ordenHabitantesPaises } from "../../redux/actions";
import { ORDEN_ALFABETICO_PAISES, ORDEN_HABITANTES_PAISES } from "../../redux/action-types";


export function Order(){
const dispatch = useDispatch()
// const orderSaved = useSelector(state => state.activeFilters.order.by)
    // const inputValue = (name)=>{
    //     if(orderSaved && orderSaved === name){
    //         return true
    //     } else {
    //         return false
    //     }
    // }
const handleSelect = (event) => {
    console.log(event.target.value)
  switch(event.target.value) {
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
    <div>
    <select onChange={handleSelect} >
        <option >Ordenar por</option>
        <option value={ORDEN_ALFABETICO_PAISES} >A-Z</option>
        <option value={ORDEN_HABITANTES_PAISES} >Población</option>
    </select>
    </div>
)
}
//<option value="dave">Dave</option>
/* <option value="pumpernickel">Pumpernickel</option>
<option value="reeses">Reeses</option> */