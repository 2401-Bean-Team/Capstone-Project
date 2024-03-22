import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

function Adminpage({ token }) {
    const [coffee, setCoffee] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        roast: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
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
   
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await editHandler(formData);
        } catch (error) {
            console.error('Error with editing product:', error);
        }
    };
  
    async function editHandler(editProductData) {
        try { console.log(editProductData) 
            await axios.put('/api/adminpage/editproduct', editProductData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
           
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
                <label>Editproduct:</label>
            <form onSubmit = {handleEdit}>
            <label>ID:</label>
                            <input
                                type="text"
                                name="id" 
                                onChange={handleChange}
                            />
                    <label>Name</label>
                            <input
                                type="text"
                                name="name" 
                                onChange={handleChange}
                            />
                            <label>Price</label>
                            <input
                                type="number"
                                name="price" 
                                onChange={handleChange}
                            />
                            <label>Description</label>
                            <input
                                type="text"
                                name="description" 
                                onChange={handleChange}
                            />
                            <label>Roast</label>
                            <input
                                type="text"
                                name="roast" 
                                onChange={handleChange}
                            />
                            <label>Image</label>
                            <input
                                type="text"
                                name="image" 
                                onChange={handleChange}
                            />
                            <input type="submit" value="Submit" />
                    </form>
            {coffee.map(c => (
                <div key={c.id} className="coffee">
                    <Link to={`/coffee/${c.id}`}>
                        <img src={c.image} alt={c.name} />
                        </Link>
                        <h1>ID: {c.id}</h1>
                        <h1>{c.name}</h1>
                        <h2>{c.price}</h2>
                        <p>{c.description}</p>
                        <h2>{c.roast}</h2> 
                        <p>imageUrl: {c.image}</p>
                    <button onClick={() => deleteHandler(c.id)}>DELETE!</button>
                </div>

            ))}
            </div>

        </div>
    );
}

export default Adminpage
