import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";  



export default function Account({ token, setToken, email, password }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null) 
    
    useEffect(() => {
        async function fetchData() {
            try { 
                const userData = await getUser(email);
                console.log('userdata: ', userData)
                setUser(userData); 
            } catch (error) {
                setError(error); 
            }
        }

        fetchData();
    }, [email]);

    async function getUser(email, token) {
        try {
            const { data } = await axios.get(`/api/users/me?email=${email}`);
            console.log('data: ', data);
            return data;
        } catch (error) {
            setError(error);
        }
    }
 
    function logOut() {
        setToken(null) 
        navigate('/')
    } 

    async function returnOrder(orderId, token) {
        try {
          // Make a request to return the order
          await axios.post(
            `/api/orders/return/${orderId}`,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          // Refetch user data after successful order return
          const userData = await getUser(email, password);
          setUser(userData);
        } catch (error) {
          console.error("Error returning order:", error);
        }
      }

    if (!user) {
        return <h1>Logged out, please <NavLink to='/login'>Login</NavLink> or <NavLink to='/register'>Register</NavLink></h1>
    }
    return ( 
        <>
              
            <main className="account" >
                <h1>Account details: </h1>
                <h3>{user.user.name}</h3>
                <h4>{user.user.email}</h4>
                <button onClick={logOut} >Log Out</button>
                 
            </main>
        </> 
    )  

}