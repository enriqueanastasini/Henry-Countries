import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { consultaActivties, consultaContinents, consultaPaises } from "../../redux/actions"

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
