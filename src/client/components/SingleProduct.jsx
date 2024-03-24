import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import axios from 'axios'

function SingleProduct({ token, email }) {
    const { productId } = useParams('');
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([])
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [orderId, setOrderId] = useState('null') 
    const [quantity, setQuantity] = useState(1)
    const [isInCart, setIsInCart ]=useState(false)
    const [productsWithDetails, setProductsWithDetails] = useState([])
    const [newItemData, setNewItemData] = useState({
        orderId: orderId, 
        productId: productId, 
        quantity: quantity
    })
    const navigate = useNavigate()
 

    useEffect(() => {
        async function fetchSingleProduct() {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setProduct(data);

            } catch (err) {
                setError('No product found with that Id!, ' + productId);
            } finally {
                setLoading(false);
            }
        }
        fetchSingleProduct();
    }, [productId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (email && token) {
                    const { data } = await axios.get(`/api/users/me?email=${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(data.user);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchUser();
    }, [email, token]);
    console.log('user: ', user)
 
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (user && token) {
                    const { data } = await axios.get(`/api/orders/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (data.length > 0) {
                        console.log('orderId: ', data[0].id)
                        setOrderId(data[0].id);
                        // Update newItemData with the latest orderId
                        setNewItemData(prevData => ({
                            ...prevData,
                            orderId: data[0].id
                        }));
                    }
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchOrder();
    }, [user, token]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (orderId && token) {
                    const { data } = await axios.get(`/api/cart/${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProducts(data);
                    const productInCart = products.find(item => item.productId === productId);
                    setIsInCart(!!productInCart);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchProducts();
    }, [orderId, token]);

      async function addToCart(productId, token) {
        try {
            console.log('newitemdata: ', newItemData)
            const response = await axios.post('http://localhost:3000/api/cart/addItem', newItemData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
             
        setIsInCart(true)
        } catch (error) {
            console.error(error)
        }
    }

    const decreaseQuantity = async () => {
        try {
            if (quantity > 1) {
                const newQuantity = quantity - 1;
                const { data } = await axios.put(`/api/cart/changeQuantity`, {
                    orderId: orderId,
                    productId: product.id,
                    quantity: newQuantity
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuantity(newQuantity);
            } else {
                console.log("Product quantity is already at minimum");
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };
    
    const increaseQuantity = async () => {
        try { 
            const newQuantity = quantity + 1;
            const { data } = await axios.put(`/api/cart/changeQuantity`, {
                orderId: orderId,
                productId: product.id,
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQuantity(newQuantity);
        } catch (error) {
            console.error(error);
        }
    };

    
const removeItem = async () => {
    try { 
            await axios.delete(`/api/cart/deleteCartItem`, {
                data: {
                    orderId: orderId,
                    productId: product.id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsInCart(false); 
            setQuantity(1)
    } catch (error) {
        console.error(error);
    }
};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <>{error.message}</>;
    }

    return ( 
        <div className='single-product-container'>
            <h1>{product.name}</h1>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            <h3>{product.roast}</h3>
            <img src={product.image} alt={product.name} />
            <h3 className="sinWord"><h1 className="sinName">{product.name}</h1>
            <br></br> {product.roast}
            <br></br> 
            <br></br>
            <br></br> {product.price}
            </h3>
            <h1>*Currently Only Avalible in whole bean</h1>
            {token ? (
                isInCart ?
                    <>
                        <h3>quantity: {quantity}</h3>
                        <button className="decreaseQuantity" onClick={decreaseQuantity}>-</button>
                        <button className="increaseQuantity" onClick={increaseQuantity}>+</button>
                        <button className="removeItem" onClick={removeItem}>Remove</button>
                    </>
                    :
                    <button className="addcartbutton" onClick={() => addToCart(productId, token)} type="button">Add to cart</button>
            ) : (
                <button className="addcartbutton" onClick={() => navigate('/login')} type="button">Log in to Add to cart</button>
                
            )}
        </div>
    );
}

export default SingleProduct;
