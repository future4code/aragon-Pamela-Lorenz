import axios from "axios";

axios.get("http://localhost:3003/ping")
    .then((res) => {
        console.log(res.data)
    })

axios.get("http://localhost:3003/afazeres/u1")
    .then((res) => {
        console.log(res.data)
    })

