import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from 'axios'

function SingleProduct() {
    const { productId } = useParams('');
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <>{error}</>;
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
            <br></br> {product.description}
            <br></br>
            <br></br> {product.price}
            </h3>
            <h1>*Currently Only Avalible in Unground</h1>

            <button className="addcartbutton" type="button">Click Me!</button>
        </div>
    );
}

export default SingleProduct;
