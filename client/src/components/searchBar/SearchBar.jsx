import React, { useEffect, useState } from "react"
import { consultaPaisName } from "../../redux/actions";
import { useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styles from "./SearchBar.module.css"



/*Estableces el valor que se está escribiendo en el input*/
export default function SerchBar() {

    const [countryName, setCountryName] = useState("") /*Creo un estado para que vaya tomando el valor que vamos escribiendo en el input y luego pueda usar para buscar al personaje*/
    const [countryList, setCountryList] = useState([]) /*Creo un estado para que vaya mostrando la lista de paises buscados en la db que van coincidiendo con el escrito*/
    const [error, setError] = useState("")
  
    const dispatch = useDispatch()
    const handleInputChange = (event) => {
        setCountryName(()=>{
            return event.target.value})
    }
    const countryNameSaved = useSelector(state => state.activeFilters.name)
    const inputValue = ()=>{ // si mi estado global tiene algo y el local no entonces devolve el global sino devolve el local
        if(countryNameSaved && !countryName){
            return countryNameSaved
        } else {
            return countryName
        }
    }
    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            dispatch(consultaPaisName(countryName))
            setCountryList([])
        }
    }
   
    const consultaPaises = async (countryName) => {
       try {
            const res = await  axios.get(`http://localhost:3001/countries?name=${countryName}`)
            setCountryList(()=>{
                setError("")
            return [...res.data]})
       } catch (error) {
            setError("Intente de otra forma")
       }
    }
    
    useEffect(
        ()=> {
            if(countryName !== "") {
            consultaPaises(countryName)
        } else if(countryName === "" && countryList.length){ 
            setCountryList([])
            setError("")
            dispatch(consultaPaisName(countryName)) 
        }
    }
        , [countryName]
    )
   
    
    /*Esta función hace la consulta al servidor con axios */ 
    /*Agregas un componente character al estado characters cuando toco click en Crear devolviendo al componente padre el listado de los personajes a agregar*/
    return (
    <div className={styles.wrap}>
        {/* Creamos el serchbar */}
        <div className={styles.search}>
            
        <input 
            type="text"
            className={styles.searchTerm}
            placeholder="Escriba su proximo destino..."
            list="options"
            value={inputValue()} 
            onChange={handleInputChange}
            onKeyPress={handleSubmit} 
            />
        <button type="submit" className={styles.searchButton}>
                        <i className="fa fa-search"></i>
                    </button>
        <datalist style={{width: "100px"}} id="options" >
            {countryList.map(country => <option value={country.name}>{country.name}</option>)}
        </datalist>
         {/*Cuando usamos el onClick y debemos pasar un parametro para que la función no se ejecute cada vez que re renderiza la página*/}
         </div>
         <div className={styles.errorContainer}>{error && <p className={styles.errorText}>{error}</p>}</div>
    </div>
    )}