import React from "react";
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
import { useState, useEffect } from "react"; // Keep useState and useEffect
import api from "../api";
import '../styles/NewStores.css'; // Using the one specified in your code
import { useNavigate } from "react-router-dom";



function NewStoresList() {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // <<< ADDED: State for search term
    const [searchResult, setsearchResult]=useState([])
    const navigate = useNavigate();

    
    useEffect(() => {
        getStores();
    }, [searchTerm]); // Re-run when searchTerm changes

    
    const getStores = async () => {
        try {
            let url = '/api/stores/admin/all/';
            if (searchTerm) {
                // Append search query parameter if searchTerm is not empty
                url += `?search=${encodeURIComponent(searchTerm)}`;
            }
           
            const res = await api.get(url);
           
            setStores(res.data.results || []); // Use empty array as fallback
        } catch (error) {
            console.error("Error fetching stores:", error);
            setStores([]); // Clear stores on error
         
        }
    };

   
    const handleSearchChange = async (event) => {
        setSearchTerm(event.target.value);
        const res = await api.get(`/api/stores/admin/all/?search=${searchTerm}`)
        setsearchResult(res.data.results || [])
        // console.log(searchResult)

    };

    return (
        <>
            <AuthNavbar />

        
            <div className="search-container" style={{ padding: '20px', textAlign: 'center' }}>
            <input
                    type="text"
                    placeholder="Search stores..."
                    value={searchTerm}
                   
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="search-input" // Add class for styling if needed in NewStores.css
                    style={{ padding: '10px', width: '50%', minWidth: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button onClick={handleSearchChange}>Search</button>
               
            </div>
            

            <div className="stores-container">
               
                {stores.length > 0 ? (
                    stores.map((store) => (
                        <div key={store.storeid} className="store-card">
                            <div className="store-image">
                                <img src={store.imageurl || `${store.name}'s Image!`} alt={store.name} /> 
                            </div>
                            <div className="store-details">
                                <h2 className="store-name">{store.name}</h2>
                                <p className="store-address">{store.address}</p>
                                <p className="store-id">ID: {store.storeid}</p>
                                <button onClick={() => navigate('/storedetails', { "state": store })}>Details</button>
                            </div>
                        </div>
                    ))
                ):(
                    <p style={{ textAlign: 'center', width: '100%' }}>
                        {searchTerm ? "No stores found matching your search." : "No stores available."}
                    </p>
                )}
            </div>
        </>
    );
}

export default NewStoresList;