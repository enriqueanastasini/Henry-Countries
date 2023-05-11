import { CONSULTA_PAISES, LIMPIAR_PAIS, CONSULTA_PAIS_NAME, CONSULTA_PAIS_ID, ORDEN_ALFABETICO_PAISES, FILTER_BY_ACTIVITIE, ORDEN_HABITANTES_PAISES, FILTER_BY_CONTINENT, CONSULTA_ACTIVITIES,  CONSULTA_CONTINENTS, CONSULTA_PAGINADO, SET_PAGINA } from "./action-types";
import axios from "axios";


/*Las actions creators son acciones que retornan un objeto con un type y cuando sea necesario un payload*/

export const consultaPaises = () => { //vamos a evitar duplicados
  return async function(dispatch) { //Se lo tengo que pasar al middelware thunk
    try {await axios("/countries/")
          .then(res => dispatch({type: CONSULTA_PAISES, payload: res.data}))
  } catch(error){
    throw alert("Surgió un problema al cargar los países, por favor recargue la página")
  }
  }
}
export const consultaPaisId =  (id) => {
  return async function(dispatch) { 
    try {
      await axios(`/countries/${id}`)
          .then(res => dispatch({type: CONSULTA_PAIS_ID, payload: res.data}))
    } 
    catch (error){
      throw alert("Surgió un problema al buscar el país, por favor recargue la página")
    }
  }
}
export const consultaContinents = () => {
  return async function(dispatch) { 
    try{
      await axios(`/continents`)
          .then(res => dispatch({type: CONSULTA_CONTINENTS, payload: res.data}))
    }
    catch (error){
      throw alert("Surgió un problema al buscar los continenetes, por favor recargue la página")
    }
  }
}

export const setPaginado = (countries) => {
  return {type: CONSULTA_PAGINADO, payload: countries}
}
export const setPagina = (pagina) => {
  return {type: SET_PAGINA, payload: pagina}
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
    try {
      axios(`/activities`)
           .then(res => dispatch({type: CONSULTA_ACTIVITIES, payload: res.data.sort((c1, c2) => c1.name.localeCompare(c2.name))}))
    } catch(error) {
      throw alert("Surgió un problema al cargar las actividades, por favor recargue la página")
    }
   }
}
