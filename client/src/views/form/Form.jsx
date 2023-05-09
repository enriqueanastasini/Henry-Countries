import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import style from "./Form.module.css"
import { handleChange, handleCountryChange, handleDelCountry, handleInputChange, handleSubmit } from "./formHandlers"

//Modularizar el FORM
//Probar las Validaciones
//Estilar

export default function Form() {
  // Estados locales
    const [countryList, setCountryList] = useState([]) // Estado de lista desplegable, listado de paises
    const [countryName, setCountryName] = useState("") // Estado del input de la lista de paises
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    
    // Consulta el nombre del pais que está siendo tipeado en el input a la db
    const consultaPaises = async () => {  
      await axios.get(`http://localhost:3001/countries?name=${countryName}`)
      .then(res=> setCountryList(()=>{
       return [...res.data]}))
    } 

    useEffect(()=> {if(countryName !== "") {
          consultaPaises()}
    console.log(inputs)}
    , [countryName, inputs])


    return(
      <div className={style.contendorGeneral}>
      <div className={style.contenedorGeneralForm}>       
        <form className={style.form} onSubmit={(e) => handleSubmit(e, inputs, errors, dispatch, setErrors)} >
          <h2 className={style.formTitle}>Crea tu propia actividad</h2>
          <div className={style.contendorCuestionario}>
            <div>
              <label htmlFor="nombre">Nombre:</label>
                <input className={style.formNombreInput} name="name" placeholder='Escribe el nombre de la actividad...' type="text" value={inputs.name}
                  onChange={(event) => handleInputChange(event, inputs, setInputs, setErrors)}
                />
            </div>
            <div className={style.errorContainer}>
            {errors.name && <p className={style.error}>{errors.name}</p> }
            </div> 
            <div className={style.container}>
              <label htmlFor="">Temporada:</label>
                <select className={style.temporadaSelector} id="season" name="season" onChange={(event) => handleInputChange(event, inputs, setInputs, setErrors)}>
                   
                   
                    {/*Agregar una opcion defalt */}


                    <option value="summer">Verano</option>
                    <option value="autumn">Otoño</option>
                    <option value="winter">Inviero</option>
                    <option value="spring">Primavera</option>
                </select>
            </div> 
            <div className={style.errorContainer}>
            {errors.season && <p className={style.error}> {errors.season}</p> }
            </div>
            <div className={style.contenedorDificultadDuracion}>
              <div>
                <label htmlFor="">Dificultad</label>
                  <input 
                    className={style.inputDuracion}
                    name="difficulty" 
                    placeholder='Escribe tu email...' 
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={inputs.difficulty} //parsear el valor porque viene en formato string
                    onChange={(event) => handleInputChange(event, inputs, setInputs, setErrors)}
                    />
                <div className={style.errorContainer} >{errors.difficulty && <p className={style.error}>{errors.difficulty}</p> }</div>
              </div>
              <div>
                <label htmlFor="message">Duración</label>
                  <input 
                    name="duration" 
                    type="number" 
                    value={inputs.duration}
                    onChange={(event) => handleInputChange(event, inputs, setInputs, setErrors)}
                    className={style.inputDuracion}
                    />
                <div className={style.errorContainer} >{errors.duration && <p className={style.error}>{errors.duration}</p> }</div>
              </div>
            </div>
          <div className={style.container}>
            <label for="countriesId">Paises</label>
            {/*BUSCADOR DE PAISES*/}
            <input 
                type="text"
                placeholder="Agregue un país..."
                list="options"
                value={countryName} 
                onChange={(event) => handleChange(event, setCountryName)}
                className={style.inputCountries}
                />
          </div>
          <div className={style.container}>
          <select className={style.selectCountries} id="options" name="countriesId" multiple> 
              <optgroup label="Selecciona un pais:"></optgroup>
              {countryList.map(country => <option name="countriesId" onClick={(event) => handleCountryChange(event, inputs, setInputs, setErrors)} value={country.id}>{country.name}</option> )}
          </select>
          </div>
          <div className={style.errorContainer} >{errors.countriesId && <p className={style.error}>{errors.countriesId}</p> }</div>
          <div className={style.contenedorPaisesAgregados}>
            <ul className={style.listaPaisesAgregados}>
              {inputs.countriesId?.map(country=> <li className={style.elementoPaisAgregado} onClick={(event) => handleDelCountry(event, inputs, setInputs, setErrors)} id={country.id}><label className={style.labelPaisAgregado}>x</label>{country.id}</li>)}
            </ul>
          </div>
        </div>
        <button className={style.botonenviar} type='submit'>Enviar</button>
        
      </form>
  </div> 
  <div className={style.contenedorImagen}></div>
  </div>
  )
}

