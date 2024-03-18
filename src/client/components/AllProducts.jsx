import { useEffect, useState } from "react"

import axios from "axios"
import { Link } from 'react-router-dom'


export default function AllProducts() {
    const [coffee, setCoffee] = useState([]);

    useEffect(() => {
        async function fetchCoffee() {
            const { data } = await axios.get('/api/products')

            setCoffee(data)
        }
        fetchCoffee()
    }, [])
    console.log( coffee )

    return <div className="allCoffee">
        <h1>Coffee:</h1>
        {coffee.map(c => <div key = {c.id} className="coffee">
            <Link to={`/${c.id}`}><img src={c.image} alt={c.name} />  <h1>{c.name}</h1><h2>{c.price}</h2><h2>{c.roast}</h2></Link>
            </div>)}

    </div>
}
