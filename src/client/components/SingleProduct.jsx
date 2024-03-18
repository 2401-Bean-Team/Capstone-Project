import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
            <img src={product.imageUrl} alt={product.name} />
        </div>
    );
}

export default SingleProduct;
