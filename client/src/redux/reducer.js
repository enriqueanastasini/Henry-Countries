import { CONSULTA_PAIS_ID, FILTER_BY_ACTIVITIE , CONSULTA_ACTIVITIES, CONSULTA_PAISES, LIMPIAR_PAIS, CONSULTA_PAIS_NAME, ORDEN_ALFABETICO_PAISES, ORDEN_HABITANTES_PAISES, FILTER_BY_CONTINENT, SET_FILTERED_COUNTRIES, CONSULTA_CONTINENTS } from "./action-types"
const initialState = { 
    countries: [], // Usado en CardsContainer
    country: {}, // Usado en Detail
    continents: [],
    chargeCountries: true, //Usado en Home
    countriesReserve: [],  // Usado en CardsContainer
    activities: [], 
    activeFilters:{
        continents:[],
        activities:[],
        order: {
            by: "",
            sentido: true, //true ascendente false descendente
        },
        name: ""
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case CONSULTA_PAISES: 
        return {...state, countries: [...action.payload], chargeCountries: false, countriesReserve: [...action.payload]}
        case SET_FILTERED_COUNTRIES: 
        return {...state, countries: [...action.payload]}
        case CONSULTA_ACTIVITIES: 
        return {...state, activities: [...action.payload]}
        case CONSULTA_CONTINENTS: 
        console.log(action.payload)
        return {...state, continents: [...action.payload]}
        case CONSULTA_PAIS_ID:
        return {...state, country: {...action.payload}}
        case CONSULTA_PAIS_NAME:
        return {...state, activeFilters: {...state.activeFilters, name: action.payload}}
        case LIMPIAR_PAIS:
        return {...state, country: {}}
        case ORDEN_ALFABETICO_PAISES:
        return {...state, activeFilters: {...state.activeFilters, order: {...state.activeFilters.order, by: "alfabetico", sentido: !state.activeFilters.order.sentido}}}
        case ORDEN_HABITANTES_PAISES:
        return {...state, activeFilters: {...state.activeFilters, order: {...state.activeFilters.order, by: "population", sentido: !state.activeFilters.order.sentido}}}
        
        case FILTER_BY_CONTINENT:
            let newContientesForFilter = []
            if(state.activeFilters.continents.includes(action.payload)){
                newContientesForFilter= [...state.activeFilters.continents.filter(continent => continent !== action.payload)]
            } else {
                newContientesForFilter= [...state.activeFilters.continents, action.payload]
            }
            if(newContientesForFilter.length){
                return {...state, activeFilters: {...state.activeFilters, continents: [...newContientesForFilter]}}
            }else {
                return {...state, activeFilters: {...state.activeFilters, continents: [...newContientesForFilter]}}
            }
                 
        case FILTER_BY_ACTIVITIE:
            let newActivitiesForFilter = []
            if(state.activeFilters.activities.includes(action.payload)){
                newActivitiesForFilter= [...state.activeFilters.activities.filter(activitie => activitie !== action.payload)]
            } else {
                newActivitiesForFilter= [...state.activeFilters.activities, action.payload]
            }
            const countriesID = []
            if(newActivitiesForFilter.length){
                    for(let actividad of state.activities) {
                    if(newActivitiesForFilter.includes(actividad.activity_id)){
                        actividad.countries.forEach(country => countriesID.push(country.id))
                    }
                    }
                return {...state, activeFilters: {...state.activeFilters, activities: [...newActivitiesForFilter]}}
            } else {
                return {...state, activeFilters: {...state.activeFilters, activities: []}}
            }
        default:
            return {...state}
    }
}
