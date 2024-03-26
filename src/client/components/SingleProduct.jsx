import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../singleitem.css';


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
    <div className='sincontan'>
        <div className="image-details-container">
            <div className= "image-price-roast">
                <img className='sinimg' src={product.image} alt={product.name} />
                <h3 className="single-price-roast" >Price: ${product.price}</h3> 
                <h3 className="single-price-roast" >Roast: {product.roast} </h3> 
            </div>
            <div className="name-description-container">
                <h1 className ="sinheader">{product.name}</h1>
                <h3 className="single-description"> {product.description}</h3>

             
         
        <div className="button-container">
            {token ? (
                isInCart ?
                    <div className="in-cart-buttons">
                        <button className="decrease-in-cart" onClick={decreaseQuantity}>-</button>
                        <h3 className="Qty">Qty: {quantity}</h3>

                        <button className="increase-in-cart" onClick={increaseQuantity}>+</button>

                        <button className="remove-from-cart" onClick={removeItem}>Remove</button>
                    </div>
                    :

                    <button className="add-to-cart-button" onClick={() => addToCart(productId, token)} type="button">Add to cart</button>
            ) : (
                <button className="add-to-cart-button" onClick={() => navigate('/login')} type="button">Log in to Add to cart</button>

            )}

        </div>
        </div>
        </div>
    </div> 
    );

}

export default SingleProduct;
