import { useEffect, useState } from "react"
import axios from "axios"
import { Link, NavLink } from 'react-router-dom'

function Adminpage({ token, setToken }) {
    const [coffee, setCoffee] = useState([]);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        roast: '',
        image: ''
    });
    const [postFormData, setPostFormData] = useState({
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

    const handleProduct = (e) => {
        const { name, value } = e.target;
        setPostFormData({ ...postFormData, [name]: value });
    }; console.log('postform data: ', postFormData)

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

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await postHandler(postFormData);
        } catch (error) {
            console.error('Error with editing product:', error);
        }
    };

    async function editHandler(editProductData) {
        try { console.log(editProductData)
            const response = await axios.put('/api/adminpage/editproduct', editProductData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCoffee(coffee.map(item => (item.id === editProductData.id ? response.data : item)));
        } catch (error) {
            console.error('Error with editing product:', error);
        }
    }

    useEffect(() => {
        async function fetchList() {
            try {
                const { data } = await axios.get('/api/users');
                setList(data.users);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching list:', error);
                setLoading(false); // Set loading to false in case of error
            }
        }
        fetchList();
    }, [])

    function logOut() {
        setToken(null)
        navigate('/')
    }


    async function postHandler(postFormData) {
        try { console.log('data sending to newproduct route: ', postFormData)
            const response = await axios.post('/api/adminpage/newproduct', postFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCoffee([...coffee, response.data]);
        } catch (error) {
            console.error('Error with editing product:', error);
        }
    }


         if (loading) {
            return <div>Loading...</div>; // Render loading indicator
    }
    if (!token) {
        return <h1>Logged out, please log in as an admin here: <NavLink to='/admin'>Admin Login</NavLink></h1>
    }
    return (
        <div >
            <button className="accBut" onClick={logOut}><NavLink to="/"></NavLink>Log Out</button>

            <h1 className="allCoffeeCoffee">Coffee:</h1>
            <div className="allCoffee">
                <div className="admincontain">
            <label>Add Product:</label>
            <form className='adminin' onSubmit = {handlePost}>

                            <input
                            placeholder="Name"
                                type="text"
                                name="name"
                                onChange={handleProduct}
                            />
                            <input
                            placeholder="Price"
                            type="number"
                            name="price"
                            step="0.01"
                            onChange={handleProduct}
                            />
                            <input
                            placeholder="Description"
                                type="text"
                                name="description"
                                onChange={handleProduct}
                            />
                            <input
                            placeholder="Roast"
                                type="text"
                                name="roast"
                                onChange={handleProduct}
                            />
                            <input
                            placeholder="Image"
                                type="text"
                                name="image"
                                onChange={handleProduct}
                            />
                            <input type="submit" value="Submit" />
                    </form>
                    </div>
                    <div className="admincontain">
                <label>Edit product:</label>
            <form className='adminin'
            onSubmit = {handleEdit}>
                            <input
                            placeholder="ID"
                                type="text"
                                name="id"
                                onChange={handleChange}
                            />
                            <input
                            placeholder="Name"
                                type="text"
                                name="name"
                                onChange={handleChange}
                            />
                            <input
                            placeholder="Price"
                            type="number"
                            name="price"
                            step="0.01"
                            onChange={handleChange}
                            />
                            <input
                            placeholder="Description"
                                type="text"
                                name="description"
                                onChange={handleChange}
                            />
                            <input
                            placeholder="Roast"
                                type="text"
                                name="roast"
                                onChange={handleChange}
                            />
                            <input
                            placeholder="Image"
                                type="text"
                                name="image"
                                onChange={handleChange}
                            />
                            <input type="submit" value="Submit" />
                    </form>
                    </div>
                    <div className="justallcoffee">
            {coffee.map(c => (
                <div key={c.id} className="justcoffee">

                        <img src={c.image} alt={c.name} />
                        <h1>ID: {c.id}</h1>
                        <h1>{c.name}</h1>
                        <h2>{c.price}</h2>
                        <p>{c.description}</p>
                        <h2>{c.roast}</h2>
                    <button className='redbutton' onClick={() => deleteHandler(c.id)}>DELETE!</button>
                </div>

            ))}
            </div>
            </div>
                <div className="userListcoffee">
            <h1 className="list">User List:</h1>
            <div className="allList">
            {list.map(c => (
                <div key={c.id} className="list">


                        <h1>{c.name}</h1>
                        <h2>Email: {c.email}</h2>
                        <h2>Hashed Passwords: {c.password}</h2>


                </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Adminpage
