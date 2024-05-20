import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
export default function AllProducts() {
    const [coffee, setCoffee] = useState([]);
    const [searchInput, setSearchInput] = useState(''); 
    const [filterInput, setFilterInput] = useState(''); 
    const [filteredCoffees, setFilteredCoffees] = useState([]);
    const [roastFilteredCoffees, setRoastFilteredCoffees] = useState([]);
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
    const filterHandler = (event) => {
        const searchTerm = event.target.value.toLowerCase(); 
        setFilterInput(searchTerm);
    };

    const searchHandler = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchInput(searchTerm);

        const filteredCoffees = coffee.filter(product =>
            (product.name.toLowerCase().includes(searchTerm) ||
            product.roast.toLowerCase().includes(searchTerm)) &&
            (filterInput === '' || product.roast.toLowerCase() === filterInput)
        );
        setFilteredCoffees(filteredCoffees);
    };

    // Filtered coffees state 

    useEffect(() => {
        // Apply initial filter on component mount
        const initialFilteredCoffees = coffee.filter(product =>
            filterInput === '' || product.roast.toLowerCase() === filterInput
        );
        setFilteredCoffees(initialFilteredCoffees);
    }, [coffee, filterInput]);

    return (
        <div className='homePageBodyContainer'>
            <div id='search-bar-container '> 
                <input
                    type="text"
                    id='search-bar'
                    placeholder='Search our products by name'
                    value={searchInput}
                    onChange={searchHandler} />   
                <select onChange={filterHandler}>
                    <option value="">Filter by Roast</option>
                    <option value="Dark" >Dark</option> 
                    <option value="Medium/Dark" >Medium/Dark</option>
                    <option value="Medium">Medium</option> 
                    <option value="Light/Medium">Light/Medium</option>
                    <option value="Light">Light</option>
                </select>  
            </div>
            {error && <div>Error: {error}</div>}
        
            {filteredCoffees.length === 0
            ?
            <h1 className="searchError">No product matches your search. </h1>
            : 
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
            </div>}
        </div>     
    );
}

