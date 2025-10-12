// src/StoreDetails.jsx - ENHANCED & FIXED

import React, { useEffect, useState } from "react"
import api from "../api"
import Navbar from "../Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/NewStoreDetails1.css' // Import the enhanced CSS
import axios from "axios";

function NewStoreDetails() {
    const location = useLocation();
    const store = location.state; // Store object passed from previous navigation
    
    // Safety check: ensure store data exists
    if (!store) {
        return (
            <div className="error-container">
                <Navbar />
                <p>Error: Store details not found. Please navigate from the main store list.</p>
            </div>
        );
    }

    const [start_date, setStart] = useState('');
    const [end_date, setEnd] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInvoiceResults, setSearchInvoiceResults] = useState(null); // null for initial state
    
    const navigate = useNavigate();

    // --- API CALLS ---

    // 1. Fetch ALL Recent Invoices for the CURRENT Store
    const getInvoices = async () => {
        try {
            // FIX: Passing storeid as a query parameter in the correct URL structure
            const res = await api.get(`/api/stores/store/invoices/?storeid=${store.id}`);
            setInvoices(res.data.invoices || []);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            setInvoices([]);
        }
    }
    
    // 2. Fetch data and navigate to Invoice page
    const handleQuery = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!start_date || !end_date) {
            alert("Please select both Start Date and End Date.");
            return;
        }

        const formdata = new FormData();
        formdata.append("store_id", store.id);
        formdata.append("start_date", start_date);
        formdata.append("end_date", end_date);

        try {
            const response = await api.post('/api/stores/store/details/', formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.status === 300 || response.data.results.length === 0) {
                alert("No orders found for the selected date range!");
                // Optionally reset dates or navigate back, but staying is better
                return;
            }
            
            // Successfully fetched data, navigate to invoice
            navigate('/invoice', { state: response.data.results });

        } catch (error) {
            console.error("Error generating invoice:", error);
            alert("An error occurred while fetching orders.");
        }
    }

    // 3. Search and filter existing invoices
    const handleSearchInvoice = async (event) => {
        event.preventDefault(); // Prevent form submission if a form wrapper existed
        
        if (!searchTerm) {
            // If search term is empty, show the main invoice list
            setSearchInvoiceResults(null); 
            getInvoices();
            return;
        }

        try {
            // FIX: Correctly structure the query to include both storeid and search term
            // Note: The API config supports search_fields on the list endpoint.
            const res = await api.get(`/api/stores/store/invoices/?storeid=${store.id}&search=${searchTerm}`);
            setSearchInvoiceResults(res.data.invoices || []);
            
        } catch (error) {
            console.error("Error searching invoices:", error);
            setSearchInvoiceResults([]);
        }
    }

    // 4. Regenerate old invoice
    const handleRegenerate = async (startDate, endDate) => {
        const formdata = new FormData();
        formdata.append("store_id", store.id);
        formdata.append("start_date", startDate);
        formdata.append("end_date", endDate);
        
        try {
            const res = await api.post("/api/stores/store/details/", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/invoice", { state: res.data.results });
        } catch (error) {
            console.error("Error regenerating invoice:", error);
            alert("Could not regenerate invoice data.");
        }
    }

    // --- LIFECYCLE ---
    useEffect(() => {
        getInvoices();
    }, [store.id]);

    // Determine which list to show in the recent invoices section
    const displayInvoices = searchInvoiceResults !== null ? searchInvoiceResults : invoices;

    // --- RENDER ---
    return (
        <>
            <Navbar />
            <div className="page-wrapper container">

                {/* Store Info Block */}
                <div className="store-info-block">
                    <h2>Store Details: {store.name}</h2>
                    <div className="storeinfo">
                        <p><strong>Store Name</strong>: {store.name}</p>
                        <p><strong>Address</strong>: {store.address}</p>
                        <p><strong>StoreID</strong>: {store.storeid}</p>
                        <p><strong>Owner Email</strong>: {store.email}</p>
                    </div>
                </div>
                
                {/* 1. Generate Invoice Section */}
                <div className="section-card">
                    <strong className="form-heading">Generate New Invoice</strong>
                    <form onSubmit={handleQuery}>
                        <label htmlFor="start_date">Start Date:</label>
                        <input 
                            type="date" 
                            id="start_date"
                            value={start_date} 
                            onChange={(e) => setStart(e.target.value)} 
                            required
                        />
                        <label htmlFor="end_date">End Date:</label>
                        <input 
                            type="date" 
                            id="end_date"
                            value={end_date} 
                            onChange={(e) => setEnd(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-btn">Get Invoice</button>
                    </form>
                </div>

                {/* 2. Recent & Search Invoices Section */}
                <div className="section-card recent-invoices-section">
                    <strong className="form-heading">Recent Invoices & Search</strong>
                    
                    {/* Search Container */}
                    <form className="search-form-container" onSubmit={handleSearchInvoice}>
                        <input
                            type="text"
                            placeholder="Search by invoice no, date (YYYY-MM-DD)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">Search</button>
                    </form>

                    {/* Invoice Table */}
                    <div className="invoice-table-wrapper">
                        <h4 className="table-title">{searchInvoiceResults !== null ? "Search Results" : "Recent Invoices"}</h4>
                        
                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Invoice No.</th>
                                    <th>Starting Date</th>
                                    <th>Ending Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(displayInvoices) && displayInvoices.length > 0 ? (
                                        displayInvoices.map((invoice, index) => (
                                            <tr key={invoice.id || `invoice-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{invoice.invoice_no}</td>
                                                <td>{invoice.start_date}</td>
                                                <td>{invoice.end_date}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className="regenerate-btn"
                                                        onClick={() => handleRegenerate(invoice.start_date, invoice.end_date)}
                                                    >
                                                        Regenerate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="no-results">
                                                {searchInvoiceResults !== null ? "No invoices matched your search." : "No recent invoices found for this store."}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewStoreDetails;