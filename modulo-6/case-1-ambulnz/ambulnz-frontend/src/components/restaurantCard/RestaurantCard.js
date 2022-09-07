import { useNavigate } from "react-router-dom"
import { goToDetailsPage } from "../../routes/cordinator"
import { RestaurantCardStyle } from "./styled"

function PizzaCard(props) {

    const navigate = useNavigate()

    return (
        <PizzaCardStyle className="container__pizza-card"
            //onClick={() => goToDetailsPage(navigate, props.pizza?.id)}
            key={props.restaurant?.id}>


            <main>
                <img className="logo__card"
                    src={props.pizza?.logoUrl}
                    alt={`logo da pizza ${props.pizza?.name}`}
                />
                <section>
                    <p>{props.pizza?.name}</p>

                    //{props.isDetail === true && <p>{props.restaurant?.category}</p>}

                    <p>{props.restaurant?.deliveryTime - 10}-{props.restaurant?.deliveryTime} min</p>
                </section>
                <section >
                    <p>Frete R$ {props.restaurant?.shipping},00</p>
                </section>
                {props.isDetail === true && <p>{props.restaurant?.address}</p>}
            </main>

        </ RestaurantCardStyle>
    )
}

export default RestaurantCard