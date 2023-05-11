import axios from "axios"
import { consultaActivties } from "../../redux/actions"
import validations from "./formValidations"


// Handle Submit --> Maneja la publicación de una nueva actividad en la db y la actualización del listado de actividades en el front
export const handleSubmit = async (e, inputs, errors, dispatch, setErrors, setInputs) =>{  
    e.preventDefault()
    if(!Object.keys(inputs).length){
      setErrors(()=>{
      const errors = validations(inputs)
      Object.values(errors).map(e=> console.log(e))
      return errors
    })
    } else {
    if(!Object.keys(errors).length){
    try{
        await axios.post('/activities', inputs, { 
            headers: {
              'Content-Type': 'application/json'
            }}) 
          .then(response => {
            alert(`La actividad ${inputs.name} fue creada con exito`)
            dispatch(consultaActivties());
            setInputs({})
          })
       } 
    catch{
        (alert(`Surgió un problema al crear la actividad ${inputs.name}`))
    }
    } else {
      Object.values(errors).map(e=> console.log(e)) //Mejorar y hacer que se vean los errores en front en vez de un alert
    }
 }
}


 //Handle Country Change --> maneja la modificación de estado de los paises que se van agregando o quitando una actividad
//  Maneja el listado de paises a los que se puede agregar una actividad
 export const handleCountryChange = async (event, inputs, setInputs, setErrors)=>{
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


export const handleInputChange = (event, inputs, setInputs, setErrors)=>{ 
    if(event.target.name === "name"){
      let activitie = event.target.value
      if(event.target.value.length){
        activitie = activitie.trimStart().split("")
        activitie[0] = activitie[0].toUpperCase()
        activitie = activitie.join("")
      }
        setInputs({...inputs, [event.target.name]: activitie})
        setErrors({...validations({...inputs, [event.target.name]: activitie})})
    } else if (event.target.name === "difficulty" || event.target.name === "duration"){
        setInputs({...inputs, [event.target.name]: parseInt(event.target.value)})
        setErrors({...validations({...inputs, [event.target.name]: parseInt(event.target.value)})})
    } else {
        setInputs({...inputs, [event.target.name]: event.target.value})
        setErrors({...validations({...inputs, [event.target.name]: event.target.value})})
  }
}
// Va guardando el valor escrito en el input del selector de paises
export const handleChange = (event, setCountryName) => {
  setCountryName(event.target.value)
}


export function handleDelCountry(event, inputs, setInputs, setErrors ) {
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