import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

function Adminpage({ token }) {
    const [coffee, setCoffee] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    
    useEffect(() => {
        async function fetchCoffee() {   
            try {
                const { data } = await axios.get('/api/products');
                setCoffee(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching coffee:', error);
                setLoading(false); // Set loading to false in case of error
            }
        }
        fetchCoffee();
    }, [])

    async function deleteHandler(productId) {
        try { console.log(productId)
            await axios.delete(`/api/adminpage/deleteproduct/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
           
            // After successful deletion, update the coffee state to reflect the changes
            setCoffee(coffee.filter(item => item.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
   
  
    async function editHandler(editProductData) {
        try { console.log(editProductData)
            await axios.put('/api/adminpage/editproduct', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },{})
           
            // After successful deletion, update the coffee state to reflect the changes
            //setCoffee(coffee.filter(item => item.id !== productId));
        } catch (error) {
            console.error('Error with editing product:', error);
        }
    }
         if (loading) {
            return <div>Loading...</div>; // Render loading indicator
    }
    return (
        <div >

            <h1 className="allCoffeeCoffee">Coffee:</h1>
            <div className="allCoffee">
            {coffee.map(c => (
                <div key={c.id} className="coffee">
                    <Link to={`/coffee/${c.id}`}>
                        <img src={c.image} alt={c.name} />
                        </Link>
                        <h1>{c.name}</h1>
                        <h2>{c.price}</h2>
                        <h2>{c.roast}</h2>
                    <form onSubmit = {handleEdit}>
                        <label>name</label>
                        <input value = {c.name}></input>
                        <input value = {c.price}></input>
                        <input value = {c.description}></input>
                        <input value = {c.roast}></input>
                        <input value = {c.image}></input>
                        <input type = 'submit' />
                    </form>
                    <button onClick={() => deleteHandler(c.id)}>DELETE!</button>
                </div>

            ))}
            </div>

        </div>
    );
}

export default Adminpage
