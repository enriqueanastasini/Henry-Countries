export const filters = (continents, activities, order, name, actividades, countriesReserve, dispatch, setFilteredCountries, setPaginado) => { // activities y actividades confusos
if(continents.length || activities.length || order.by || name){
    if(continents.length) {
        countriesReserve = countriesReserve.filter(country => continents.includes(country.continent))
    }  
    if(activities.length) {
        const countriesID = []
        for(let actividad of actividades) {
            if(activities.includes(actividad.activity_id)){
                actividad.countries.forEach(country => countriesID.push(country.id))
            }
        }
            countriesReserve = countriesReserve.filter(country => countriesID.includes(country.id))
    }
    if(order.by){
        switch(order.by) {
            case "alfabetico":
                order.sentido ? 
                    countriesReserve = countriesReserve.sort((c1, c2) => c1.name.localeCompare(c2.name))
                 : 
                    countriesReserve = countriesReserve.sort((c1, c2) => c2.name.localeCompare(c1.name))
            break
            case "population":
                order.sentido ?
                    countriesReserve = countriesReserve.sort((c1, c2) => c2.population - c1.population)
                :
                    countriesReserve = countriesReserve.sort((c1, c2) => c1.population - c2.population)
            break
            default:
            break
        }
    }
    if(name){
        countriesReserve = countriesReserve.filter(country => country.name.toUpperCase().includes(name.toUpperCase()))
    }
    dispatch(setFilteredCountries(countriesReserve))
    dispatch(setPaginado(countriesReserve))
} else if(!name.length) {
    dispatch(setFilteredCountries(countriesReserve))
    dispatch(setPaginado(countriesReserve))
}
}