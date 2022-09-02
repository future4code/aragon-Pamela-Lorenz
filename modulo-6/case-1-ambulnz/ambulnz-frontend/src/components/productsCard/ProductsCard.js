import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../../global/GlobalStateContext";
import { convertPrice } from "../../utils/convertPrice";
import { CardStyle } from "./styled";

function ProductsCard(props) {
    const [isModal, setIsModal] = useState(false)

    const context = useContext(GlobalStateContext)

    const { orders, productQuantity } = context.states

    const { setOrders, setProductQuantity } = context.setters

    const toggleModal = () => {
        setProductQuantity("")
        setIsModal(!isModal)
    }

    const getProductOrder = () => {
        const newOrder = {
            products: props.product,
            quantity: productQuantity
        }
        toggleModal()

        console.log(newOrder)
        setOrders([...orders, newOrder])
    }

    const onChangeQuantity = (e) => {
        setProductQuantity(e.target.value)
    }

    return (
        <CardStyle>
            <img src={props.product.photoUrl} alt={`foto de ${props.product.name}`} />
            <h3>{props.product.name}</h3>
            <p>{props.product.description}</p>
            <p>{convertPrice(props.product.price)}</p>

            <Button variant="outlined" onClick={
                toggleModal
            }>Adicionar ao Carrinho</Button>

            {
                isModal &&
                <div>
                    <input
                        value={productQuantity}
                        onChange={onChangeQuantity}
                        type="number"
                    />
                    <button onClick={() => {
                        getProductOrder()

                    }}>Adicionar</button>
                    <button onClick={toggleModal} >Cancelar</button>
                </div>

            }
            {/* <p>Quantidade</p>
            <button>-</button> */}
        </CardStyle>
    )
}

export default ProductsCard;