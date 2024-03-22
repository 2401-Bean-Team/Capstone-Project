import { useEffect, useState } from "react"
//import { deleteProduct, editProduct } from '..db/product'
import axios from "axios"
import { Link } from 'react-router-dom'

async function Adminpage() {
    const [coffee, setCoffee] = useState([]);

    useEffect(() => {
        async function fetchCoffee() {
            const { data } = await axios.get('/api/products')

            setCoffee(data)
        }
        fetchCoffee()
    }, [])
    console.log( coffee )

    async function deleteHandler(productId) {
        await deleteProduct(productId)
    }

    return (
        <div >

            <h1 className="allCoffeeCoffee">Coffee:</h1>
            <div className="allCoffee">
            {coffee.map(c => (
                <div key={c.id} className="coffee">
                    <Link to={`/coffee/${c.id}`}>
                        <img src={c.image} alt={c.name} />
                        <h1>{c.name}</h1>
                        <h2>{c.price}</h2>
                        <h2>{c.roast}</h2>
                        <button onClick={() => deleteHandler(productId)}>DELETE!</button>
                    </Link>
                </div>

            ))}
            </div>

        </div>
    );
}

module.exports = { 
Adminpage,
}
