import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

function SingleProduct() {

const params = useParams()
const productName = params.product

const [product, setProduct] = useState({})
const [error, setError] = useState('')

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const { data } = await axios.get(`/api/coffee/${productName}`)
        setProduct(data)
      } catch (err) {
        setError('No product found with that name!, ' + productName)
      } 
    }
    fetchSingleProduct()
  },[])

    console.log('SingleProduct:', product)
    if (error) {
        return <>{error}</>
    }
    return <div className='single-product-container'>
        <h1>{product.name}</h1>
        <h3>{product.description}</h3>
        <h3>{product.price}</h3>
        <h3>{product.roast}</h3>
        <img src={product.imageUrl} />
    </div>
}


export default SingleProduct