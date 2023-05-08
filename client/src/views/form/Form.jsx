import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { consultaActivties } from "../../redux/actions"
import style from "./Form.module.css"
import validations from "./Validations"

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
    
    const consultaPaises = async () => {  // Consulta el nombre del pais que está siendo tipeado en el input a la db
      await axios.get(`http://localhost:3001/countries?name=${countryName}`)
      .then(res=> setCountryList(()=>{
       return [...res.data]}))
    } // se usa?

    // Manejo de Submit del Formulario
    
    const handleSubmit = (e) =>{  //Se podría modularizar
      e.preventDefault()
      if(!Object.keys(errors).length){
        axios.post('http://localhost:3001/activities', inputs, { //Se podría modularizar
          headers: {
            'Content-Type': 'application/json'
          }}) // Envía una solicitud POST al servidor con los datos del formulario en el cuerpo
        .then(response => {
          alert(`La actividad ${inputs.name} fue creada con exito`)
          dispatch(consultaActivties());
        })
        .catch(alert(`Surgió un problema al crear la actividad ${inputs.name}`))
      } else{
        alert(errors)
      }
   }

     // Va guardando la información que está cargando el usuario
    const handleInputChange = (event)=>{ 
        if(event.target.name === "difficulty"){
          setInputs({...inputs, [event.target.name]: parseInt(event.target.value)})
          setErrors({...validations({...inputs, [event.target.name]: parseInt(event.target.value)})})
        } else {
        setInputs({...inputs, [event.target.name]: event.target.value})
        setErrors({...validations({...inputs, [event.target.name]: event.target.value})})
      }
    }
    // Va guardando el valor escrito en el input del selector de paises
    const handleChange = (event) => {
      setCountryName(event.target.value)
  }
 
    //MODULARIZAR --> Maneja el listado de paises a los que se puede agregar una actividad

    const handleCountryChange = async (event)=>{
      console.log(event.target.value)
      if(inputs.countriesId){
      let unRepitedCountrie = true
      for(let countriesId of inputs.countriesId){
        if(countriesId.id === event.target.value){
          unRepitedCountrie = false
          setInputs({
            ...inputs, 
            countriesId: [...inputs.countriesId.filter(country => country.id !== event.target.value)]
          })
            setErrors(validations({
              ...inputs, 
              countriesId: [...inputs.countriesId.filter(country => country.id !== event.target.value)]
            }))
          }
        } 
        if(unRepitedCountrie){
          setInputs({
            ...inputs, 
            countriesId: [...inputs.countriesId, { id: event.target.value}]
          })
          setErrors(validations({
            ...inputs, 
            countriesId: [...inputs.countriesId, { id: event.target.value}]
          }))
        }
        } else {
          setInputs({
            ...inputs, 
            countriesId: [{ id: event.target.value}]
          }) 
          setErrors(validations({
            ...inputs, 
            countriesId: [{ id: event.target.value}]
          }))
        }
  }
  function handleDelCountry(event) {
    for(let countriesId of inputs.countriesId){
      if(countriesId.id === event.target.id){
        setInputs({
          ...inputs, 
          countriesId: [...inputs.countriesId.filter(country => country.id !== event.target.id)]
        })
          setErrors(validations({
            ...inputs, 
            countriesId: [...inputs.countriesId.filter(country => country.id !== event.target.id)]
          }))
        }
      } 
  }
//  --------------------------

    useEffect(()=> {if(countryName !== "") {
          consultaPaises()}
    console.log(inputs)}
    , [countryName])


    return(
      <div className={style.contendorGeneral}>
      <div className={style.contenedorGeneralForm}>       
        <form className={style.form} onSubmit={handleSubmit} >
          <h2 className={style.formTitle}>Crea tu propia actividad</h2>
          <div className={style.contendorCuestionario}>
            <div>
              <label htmlFor="nombre">Nombre:</label>
                <input className={style.formNombreInput} name="name" placeholder='Escribe el nombre de la actividad...' type="text" value={inputs.name}
                  onChange={handleInputChange}
                />
            </div>  
            <div className={style.container}>
              <label htmlFor="">Temporada:</label>
                <select className={style.temporadaSelector} id="season" name="season" onChange={handleInputChange}>
                    <option value="summer">Verano</option>
                    <option value="autumn">Otoño</option>
                    <option value="winter">Inviero</option>
                    <option value="spring">Primavera</option>
                </select>
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
                    onChange={handleInputChange}
                    />
              </div>
              <div>
              <label htmlFor="message">Duración</label>
                <input 
                  name="duration" 
                  type="number" 
                  value={inputs.duration}
                  onChange={handleInputChange}
                  className={style.inputDuracion}
                  />
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
                onChange={handleChange}
                className={style.inputCountries}
                />
          </div>
          <div className={style.container}>
          <select className={style.selectCountries} id="options" name="countriesId" multiple> 
              <optgroup label="Selecciona un pais:"></optgroup>
              {countryList.map(country => <option name="countriesId" onClick={handleCountryChange} value={country.id}>{country.name}</option> )}
          </select>
          </div>
          <div className={style.contenedorPaisesAgregados}>
            <ul className={style.listaPaisesAgregados}>
              {inputs.countriesId?.map(country=> <li className={style.elementoPaisAgregado} onClick={handleDelCountry} id={country.id}><label className={style.labelPaisAgregado}>x</label>{country.id}</li>)}
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

