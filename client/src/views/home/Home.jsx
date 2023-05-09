import CardsContainer from "../../components/cardsContainer/CardsContainer"
import SerchBar from "../../components/searchBar/SearchBar"
import { FilterContinents } from "../../components/filter/FilterContinents"
import { FilterActivities } from "../../components/filter/FilterActivities"
import styles from "./Home.module.css"
import useHomeMount from "./useHomeMount"


export default function Home() {
     // Cuando se monta el componente cards hace la request al servidor
    useHomeMount()
    
    return(
        <div className={styles.contendorPrincipal}>
            <div className={styles.contendorFiltros}> 
                <SerchBar/>
                <FilterContinents/>
                <FilterActivities/>
            </div>
            <div className={styles.contendorCards}>
                <CardsContainer/>
            </div>
        </div>
    )
}