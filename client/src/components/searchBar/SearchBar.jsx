import React, { useEffect, useState } from "react"
import { consultaPaisName } from "../../redux/actions";
import { useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styles from "./SearchBar.module.css"


/*Estableces el valor que se está escribiendo en el input*/
export default function SerchBar() {

    // const dispatch = useDispatch();


    const [countryName, setCountryName] = useState("") /*Creo un estado id para que vaya tomando el valor que vamos escribiendo en el input y luego pueda usar para buscar al personaje*/
    const [countryList, setCountryList] = useState([]) /*Creo un estado id para que vaya tomando el valor que vamos escribiendo en el input y luego pueda usar para buscar al personaje*/
  
    const dispatch = useDispatch()
    const handleInputChange = (event) => {
        setCountryName(event.target.value)
    }
    const countryNameSaved = useSelector(state => state.activeFilters.name)
    const inputValue = ()=>{
        if(countryNameSaved && !countryName){
            return countryNameSaved
        } else {
            return countryName
        }
    }
    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            dispatch(consultaPaisName(countryName))
        }
    }
    const handleClic = (event) => {
        dispatch(consultaPaisName(event.target.value))
    }
    const consultaPaises = async () => {
       await axios.get(`http://localhost:3001/countries?name=${countryName}`)
       .then(res=> setCountryList(()=>{
        return [...res.data]}))
    }

    useEffect(
        ()=> {if(countryName !== "") {
            consultaPaises()
        } else if(countryName === "" && countryList.length){ 
            setCountryList([])
            dispatch(consultaPaisName(countryName)) ///esto no tiene en cuenta los otros filtros --> como hacer para tenerlos en cuenta?
        }
    }
        , [countryName]
    )
   
    
    /*Esta función hace la consulta al servidor con axios */ 
    /*Agregas un componente character al estado characters cuando toco click en Crear devolviendo al componente padre el listado de los personajes a agregar*/
    return (
    <div class={styles.wrap}>
        {/* Creamos el serchbar */}
        <div class={styles.search}>
            
        <input 
            type="text"
            class={styles.searchTerm}
            placeholder="Escriba su proximo destino..."
            list="options"
            value={inputValue()} 
            onChange={handleInputChange}
            onKeyPress={handleSubmit} 
            />
        <button type="submit" class={styles.searchButton}>
                        <i class="fa fa-search"></i>
                    </button>
        <datalist style={{width: "100px"}} id="options" >
            {countryList.map(country => <option onClick={handleClic} value={country.name}>{country.name}</option> )}
        </datalist>
         {/*Cuando usamos el onClick y debemos pasar un parametro para que la función no se ejecute cada vez que re renderiza la página*/}
         </div>
    </div>
    )}

    //onChange={handleInputChange} value={id}
    //<button onClick={() =>  >Crear</button>