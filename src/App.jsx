import { useState } from 'react'
import { BrowserRouter,Routes,Route,Navigate,HashRouter} from 'react-router-dom'
import StoresList from './pages/Stores'; 
import NewStoresList from './pages/NewStoreList';
import StoreDetails from './pages/StoreDetails';
import Home from './pages/Invoice';
import { DataProvider } from './components/Context';
import Login from './components/Login';
function App() {
  function ResgisterandLogout(){
    localStorage.clear();
    return <Register/>
  }
  function Logout(){
    localStorage.clear();
    return <Navigate to={'/'}/>
  }

  return (
    // <BrowserRouter>
     <HashRouter> 
        <Routes>
          <Route path='/' element={<Login/>}/>
           {/* <Route path='/home' element={<StoresList/>}/> */}
           <Route path='/home' element={<NewStoresList/>}/>
           <Route path='/logout' element={<Logout/>}/>
           
         
       
            <Route path='/storedetails' element={<StoreDetails/>}/>
            <Route path='/invoice' element={<Home/>}/> 
            </Routes> 
          
        
      
            </HashRouter>
    // </BrowserRouter>
  )
}

export default App
