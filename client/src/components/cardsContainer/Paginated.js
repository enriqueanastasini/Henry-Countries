import { useEffect } from "react"
import { setPagina } from "../../redux/actions"


export function usePaginated(setActualPage, paginado, pagina, setActualPageList, paginas){

useEffect(()=> {
    if(pagina>paginas.length){
        setPagina(0)
    } else {
    setActualPage(paginado[pagina])
    setActualPageList(()=>{
        if(pagina+10 < paginas.length){
        return paginas.slice(pagina, pagina + 10)
        } else if(paginas.length<10){
            return paginas.slice(0, paginas.length)
        }
            return paginas.slice(paginas.length-10, paginas.length)
        })
        }
    }
,[paginado , pagina, paginas])}