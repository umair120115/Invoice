import React from "react";
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
import { useState,useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../components/Context";
function StoresList(){
    const [stores,setStores]=useState([])
    const navigate=useNavigate();
    useEffect(
        ()=>{
            getStores();
        },[]
    )
    
     

    const getStores=async()=>{
        const res= await api.get('/api/stores/admin/all/').then(
            (res)=>{
                setStores(res.data.results);
            }
        )
    }
    
    return <>
    {/* <AuthNavbar /> */}
    <Navbar/>
      <div className="stores-container">
        {stores.map((store) => (
          <div key={store.storeid} className="store-card">
            <div className="store-image">
              <img src={store.imageurl} alt={store.name} />
            </div>
            <div className="store-details">
              <h2 className="store-name">{store.name}</h2>
              {/* <p className="store-owner">Owner: {store.owner_name}</p> */}
              <p className="store-address">{store.address}</p>
              <p className="store-id">ID: {store.storeid}</p>
              <button onClick={()=>navigate('/storedetails',{"state":store})}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </>
}
export default StoresList