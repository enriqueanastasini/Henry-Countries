import { setPaginado } from "../../redux/actions";

function filterByOrder(orderFilter, countriesReserve){
    switch(orderFilter.by) {
        case "alfabetico":
            orderFilter.sentido ? 
                countriesReserve = countriesReserve.sort((c1, c2) => c1.name.localeCompare(c2.name))
             : 
                countriesReserve = countriesReserve.sort((c1, c2) => c2.name.localeCompare(c1.name))
        break
        case "population":
            orderFilter.sentido ?
                countriesReserve = countriesReserve.sort((c1, c2) => c2.population - c1.population)
            :
                countriesReserve = countriesReserve.sort((c1, c2) => c1.population - c2.population)
        break
        default:
        break
}
}
function filterByActivities(activitiesList, activitiesFilter, countriesReserve ){
    const countriesID = []
    for(let activitie of activitiesList) {
        if(activitiesFilter.includes(activitie.activity_id)){
            activitie.countries.forEach(country => countriesID.push(country.id))
        }
    } 
    return countriesReserve.filter(country => countriesID.includes(country.id))
}

//se podrian hacer funciones de cada filtro
export const filters = (continentsFilter, activitiesFilter, orderFilter, nameFilter, activitiesList, countriesReserve, dispatch) => { // activities y actividades confusos

    if(continentsFilter.length || activitiesFilter.length || orderFilter.by || nameFilter){
    if(continentsFilter.length) {
        countriesReserve = countriesReserve.filter(country => continentsFilter.includes(country.continent))
    }  
    if(activitiesFilter.length) {
            countriesReserve = filterByActivities(activitiesList, activitiesFilter, countriesReserve)
    }
    if(orderFilter.by){
        filterByOrder(orderFilter, countriesReserve)
    }
    if(nameFilter){
        countriesReserve = countriesReserve.filter(country => country.name.toUpperCase().includes(nameFilter.toUpperCase()))
    }
    dispatch(setPaginado(countriesReserve))
} else if(!nameFilter.length) {
    dispatch(setPaginado(countriesReserve))
}
}