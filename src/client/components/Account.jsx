import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";



export default function Account({token, setToken}) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)  
    const userId = user.id
    
    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUser(token);
                setUser(userData); 
            } catch (error) {
                setError(error); 
            }
        }

        fetchData();
    }, [token]);

    async function getUser(token) {
        const { data } = await axios.get('/api/users/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    }
 
    function logOut() {
        setToken(null) 
        navigate('/')
    } 

    if (!user) {
        return <h1>Logged out, please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink></h1>
    }
    return ( 
        <>
              
            <main className="account" >
                <h1>Account details</h1>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <button onClick={logOut} >Log Out</button>
                <h2>Your Orders: </h2>
                <section className="orders-account-list"> 
                {user.orders.length === 0 ? (
                    <h4>No items in order</h4>
                ) : (  
                    user.orders.map(order => (  
                        <article key={order.id} className="order-item-card">
                            <h4>{order.name}</h4>
                            <h5>{order.price}</h5>
                            <h5>{order.roast}</h5>
                            <img src={order.image} alt={order.name} /> 
                            <p>{order.description}</p>
                            <button onClick={()=> returnorder(order.id, token)} >Return order</button>
                        </article>   
                    )) 
                )}
                </section>
            </main>
        </> 
    )  

}