import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { consultaActivties, consultaContinents, consultaPaises } from "../../redux/actions"


// Ejecuta la consultas iniciales a la api una vez que carga la página y luego evita que esa consulta se realice nuevamente
export default function useHomeMount(){
    const chargeCountries = useSelector((state => state.chargeCountries)) 
    const dispatch = useDispatch()
    useEffect(()=>{
        if(chargeCountries) {
          dispatch(consultaPaises())
          dispatch(consultaContinents())
          dispatch(consultaActivties())
        }
    },[dispatch])
}
