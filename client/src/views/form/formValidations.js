function validateName(name){
  const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]+$/  ; // No te permite agregar espacios en el nombre de una actividad
  if(name===""){
    return "El nombre de la actividad no puede estar vacio"
  }
  if(typeof name !== "string"){
    return `El nombre de la actividad ${name} no es valido`
  }
  if(name.length < 5){
    return "El nombre de la actividad es demasiado corto"
  } else if(name.length > 40){
    return "El nombre de la actividad es demasiado largo"
  }
  console.log(regex.test(name))
  if(!regex.test(name)){
    return "El nombre de la actividad no puede contener carateres especiales"
  }
}
function validateSeason(season){
  if(typeof season !== "string"){
    return "Seleccione una opción válida"
  }
  if(season !== "summer" && season && 'spring' && season !== 'winter' && season !== 'autumn'){
    return "Seleccione una opción válida"
  }
}
function validateDuration(duration){
  if(typeof duration !== "number"){
    return "La duración debe ser un numero"
  }
}

function validateDifficulty(difficulty){
  if(!difficulty) {
    return "Debe ingresar una dificultad"
  }
  console.log(typeof difficulty)
  if(typeof difficulty !== "number" || difficulty > 5 || difficulty < 1){
    return "La dificultad debe ser un número válido entre 1-5"
  }
}
function validatecountriesId(countriesId){
  if(!countriesId.length){
    return "Debe seleccionar al menos un país"
  }
}
export default function validations(inputs){
   
    const errors={
    }
    if(inputs.name || inputs.difficulty || inputs.season || inputs.duration || inputs.countriesId){
    if(inputs.name){
      //funcion que valida el name
        errors.name = validateName(inputs.name)
      } else {errors.name = "Debe indicar el nombre de la actividad"}
      if(inputs.difficulty){
        errors.difficulty = validateDifficulty(inputs.difficulty)
      } else {errors.difficulty = "Debe seleccionar una dificultad"}
      if(inputs.season){
        errors.season = validateSeason(inputs.season)
      } else {errors.season = "Debe seleccionar una temporada"}
      if(inputs.duration){
        errors.duration = validateDuration(inputs.duration)
      } 
      if(inputs.countriesId){
        errors.countriesId = validatecountriesId(inputs.countriesId)
      } else {errors.countriesId = "Debe seleccionar al menos un país"}
      if(Object.values(errors).every(e=> e=== undefined)) {
        return {}
      }
    console.log(errors)
    return errors
  }
    return {
      countriesId : "Debe seleccionar al menos un país",
      season : "Debe seleccionar una temporada",
      difficulty : "Debe seleccionar una dificultad",
      name : "Debe indicar el nombre de la actividad"
    }
  }