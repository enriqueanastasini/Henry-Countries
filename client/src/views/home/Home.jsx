import CardsContainer from "../../components/cardsContainer/CardsContainer"
import SerchBar from "../../components/searchBar/SearchBar"
import { Order } from "../../components/order/Order"
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
                {/* <Order/> */}
                <FilterContinents/>
                <FilterActivities/>
            </div>
            <div className={styles.contendorCards}>
                <CardsContainer/>
            </div>
        </div>
    )
}