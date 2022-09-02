import axios from "axios"
import { useEffect, useState } from "react";

export default function App() {
  const [pizzas, setPizzas] = useState([])
  const [orders, setOrders] = useState([])
  useEffect(() => {

    if (!token) {
      goToLoginPage(navigate);
    }

    axios.get(`${BASE_URL}pizzas`).then((res) => {
      setPizzas(res.data.pizzas)
    })

    axios.get(`${BASE_URL}orders`).then((res) => {
      setOrders(res.data.orders)
    })
  }, [])

  return (

    <main>
      <header>
        <p> Ambulnz</p>
      </header>

      <section>
        <ul>
          {pizzas.map((pizza) => (
            <li>
              <p> {pizza.name}</p>
              <p>{pizza.price} </p>
              <p> {pizza.ingredients}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
