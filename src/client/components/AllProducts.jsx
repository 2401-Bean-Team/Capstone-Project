import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"


export default function AllProducts() {
    const [coffee, setCoffee] = useState([]);

    useEffect(() => {
        async function fetchCoffee() {
            const { data } = await axios.get('/api/products')

            setCoffee(data)
        } 
        fetchCoffee()
    }, [])

    return <h1>allproducts</h1>
}
