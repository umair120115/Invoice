import React, { useEffect, useState ,useContext} from "react"
import api from "../api"
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
import { useNavigate,useLocation ,Link} from "react-router-dom";
// import '../styles/storeDetails.css'
import '../styles/NewStoreDetails.css'
function StoreDetails(){
    const location = useLocation();
    const store= location.state
    const [start_date,setStart]=useState('')
    const [end_date,setEnd]=useState('')
    // const [store_id,setStoreid]=useState('');
    const [orders, setOrders]=useState([]);
    const [invoices,SetInvoices]=useState([])
    const [searchTerm, SetsearchTerm]=useState('');
    const [searchInvoiceResults,SetsearchInvoiceResults]=useState([])
    // const search_results_length= searchInvoiceResults.length
    const navigate=useNavigate();
    useEffect(
        ()=>{
            getInvoices();
        }, []
    );

    const getInvoices=async()=>{
        const res = await api.get(`/api/stores/store/invoices/${store.storeid}`)
        SetInvoices(res.data.results);
        console.log(res.data.results);

    }
    
    
   

    const handleQuery=async(e)=>{
        e.preventDefault();
        const formdata= new FormData();
        formdata.append("store_id", store.storeid);
      
        formdata.append("start_date",start_date);
        
        formdata.append("end_date",end_date);
      
        const response = await api.post('/api/stores/store/details/',formdata,{
            headers:{"Content-Type":"multipart/form-data"},
        }) 
        setOrders(response.data.results);
        
        // navigate('/invoice',{"state":response.data.results});
        navigate('/invoice',{"state":response.data.results})
        // console.log(response.data.results)
        

    }
    const handleRegenerate=async(start_date,end_date)=>{
        
        const formdata=new FormData();
        formdata.append("store_id",store.storeid)
        formdata.append("start_date",start_date)
        formdata.append("end_date",end_date)
        const res = await api.post("/api/stores/store/details/",formdata,{
            headers:{"Content-Type":"multipart/form-data"},
        }) 
        // SetoldInvoiceProducts(res.data.results);
        navigate("/invoice",{"state":res.data.results})

    }
    const handleSearchInvoice=async(event)=>{
        SetsearchTerm(event.target.value)
        const res = await api.get(`/api/stores/store/invoices/${store.storeid}/?search=${searchTerm}`);
        SetsearchInvoiceResults(res.data.results || []);
        // console.log(res.data.results);

    }
    

    return <>
    <AuthNavbar/>
    <div className="storeinfo">
        <p><strong>Store Name</strong>: {store.name}</p>
        <p><strong>Address</strong>: {store.address}</p>
        <p><strong>StoreID</strong>: {store.storeid}</p>
    </div>
     
    
<strong className="form-heading">Generate Invoice</strong>
    <form action="" onSubmit={handleQuery}>
        <label htmlFor="">Start Date:</label>
        <input type="date" placeholder="Start Date" value={start_date} onChange={(e)=>setStart(e.target.value)}/>
        <label htmlFor="">End Date:</label>
        <input type="date" placeholder="End Date"  value={end_date}  onChange={(e)=>setEnd(e.target.value)}/>
        <button type="submit">Get Invoice</button>
    </form>


    
    <div className="recent-invoices">
        <strong className="form-heading" >Search from recent Invoices! </strong>
            <div className="search-container" style={{ padding: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search invoice with start-date....."
                    value={searchTerm}
                    // onChange=   {handleSearchChange}
                    onChange={(e)=>SetsearchTerm(e.target.value)}
                    className="search-input" // Add class for styling if needed in NewStores.css
                    style={{ padding: '10px', width: '50%', minWidth: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                    <button type="submit" onClick={handleSearchInvoice}>Search</button>
                    <div className="search-results">
                        {
                            searchInvoiceResults.length > 0 ?
                            (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Invoice No.</th>
                                            <th>Starting Date</th>
                                            <th>Ending Date</th>
                                            <th>Regenerate</th>
                                        </tr>
                                    </thead>
                                    {
                                        searchInvoiceResults.map(
                                            (value)=>{
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td>{value.invoice_no}</td>
                                                            <td>{value.start_date}</td>
                                                            <td>{value.end_date}</td>
                                                            <td><button type="submit" onClick={()=>handleRegenerate(value.start_date,value.end_date)}>Regenerate</button></td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        )
                                    }
                                </table>
                            ) : (
                                "No search results found!"
                            )
                        }
                    </div>
            </div>
    </div>
    <hr style={{'color':'blueviolet'}} />
    <strong className="form-heading" >Recent Invoices! </strong>
    
    <div className="invoice-table">
        
        <table>
            <thead>
                <tr>
                    <th>Serial No.</th>
                    <th>Invoice No.</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Click to Regenerate</th>
                </tr>
            </thead>
        
            
            <tbody>
                {
                    invoices.map(
                        (invoice,index)=>{
                            return (
                            <tr key={invoice.id || `invoice-${index}`}>
                                <td>{index+1}</td>
                                <td>{invoice.invoice_no}</td>
                                <td>{invoice.start_date}</td>
                                <td>{invoice.end_date}</td>
                                <td><button type="submit" onClick={()=>handleRegenerate(invoice.start_date,invoice.end_date)}>Regenerate</button></td>
                            </tr>
                            
                            )
                        }
                    )
                }
            </tbody>
        </table>
       
    </div>
            
            
        
       
        

   
</>    
}

export default StoreDetails;
