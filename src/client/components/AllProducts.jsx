import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
export default function AllProducts() {
    const [coffee, setCoffee] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredCoffees, setFilteredCoffees] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        async function fetchCoffee() {
            try {
                const { data } = await axios.get('/api/products');
                setCoffee(data);
                setFilteredCoffees(data); // Initially, set filteredCoffees to all coffees
            } catch (error) {
                setError('Error fetching coffee data');
            }
        }
        fetchCoffee();
    }, []);
    // Search handler function
    const searchHandler = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchInput(searchTerm);
        const filteredCoffees = coffee.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.roast.toLowerCase().includes(searchTerm)
        );
        setFilteredCoffees(filteredCoffees);
    };
    return (
        <div className = 'search-bar-container' >
            <div id='search-bar'>
                <label>
                    Search Coffee:
                    <input
                        id='search-bar'
                        placeholder='Search our products by name or roast'
                        value={searchInput}
                        onChange={searchHandler} />
                </label>
            </div>
            {error && <div>Error: {error}</div>}
        
    
            <div className="allCoffee">
                {filteredCoffees.map(c => (
                    <div key={c.id} className="coffee">
                        <Link to={`/coffee/${c.id}`}>
                            <img src={c.image} alt={c.name} />
                            <h1>{c.name}</h1>
                            <h2>${c.price}</h2>
                            <h2>{c.roast}</h2>
                        </Link>
                    </div>
                ))}    
         </div>
    </div>     
    );
}

