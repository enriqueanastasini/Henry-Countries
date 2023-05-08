import { CONSULTA_PAISES, LIMPIAR_PAIS, CONSULTA_PAIS_NAME, CONSULTA_PAIS_ID, ORDEN_ALFABETICO_PAISES, FILTER_BY_ACTIVITIE, ORDEN_HABITANTES_PAISES, FILTER_BY_CONTINENT, CONSULTA_ACTIVITIES, SET_FILTERED_COUNTRIES, CONSULTA_CONTINENTS } from "./action-types";
import axios from "axios";


/*Las actions creators son acciones que retornan un objeto con un type y cuando sea necesario un payload*/

export const consultaPaises = () => { //vamos a evitar duplicados
  return async function(dispatch) { //Se lo tengo que pasar al middelware thunk
    await axios("http://localhost:3001/countries/")
          .then(res => dispatch({type: CONSULTA_PAISES, payload: res.data}))
  }
}
export const consultaPaisId =  (id) => {
  return async function(dispatch) { 
    await axios(`http://localhost:3001/countries/${id}`)
          .then(res => dispatch({type: CONSULTA_PAIS_ID, payload: res.data}))
  }
}
export const consultaContinents = () => {
  return function(dispatch) { 
    axios(`http://localhost:3001/continents`)
          .then(res => dispatch({type: CONSULTA_CONTINENTS, payload: res.data}))
  }
}
export const setFilteredCountries = (countries) => {
  return {type: SET_FILTERED_COUNTRIES, payload: countries}
}

export const limpiarPais = () => {
  return {type: LIMPIAR_PAIS}
}

export const consultaPaisName = (name) => {
  return {type: CONSULTA_PAIS_NAME, payload: name}
}

export const ordenAlfabeticoPaises = () => {
  return {type: ORDEN_ALFABETICO_PAISES}
}
export const ordenHabitantesPaises = () => {
  return {type: ORDEN_HABITANTES_PAISES}
}
export const filterByContient = (continents) => {
  return {type: FILTER_BY_CONTINENT, payload: continents}
}
export const filterByActivities = (activitie) => {
  return {type: FILTER_BY_ACTIVITIE, payload: activitie}
}
export const consultaActivties = () => { //hacerlo despues del send de form
  return function(dispatch) {
    axios(`http://localhost:3001/activities`)
           .then(res => dispatch({type: CONSULTA_ACTIVITIES, payload: res.data}))
   }
}
