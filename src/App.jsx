import { useState } from 'react'
import { BrowserRouter,Routes,Route,Navigate,HashRouter} from 'react-router-dom'
import NewStoresList from './pages/NewStoreList';
import Home from './pages/Invoice';
import { DataProvider } from './components/Context';
import Login from './components/Login';
import WinnerDetails from './pages/WinnersList';
import ProtectedRoute from './components/ProtectedRoute';
import StoreDetails from './pages/StoreDetails';


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
           <Route path='/home' element={<ProtectedRoute><NewStoresList/></ProtectedRoute>}/>
           <Route path='/logout' element={<Logout/>}/>
           <Route path='/winnerlist' element={<ProtectedRoute><WinnerDetails/></ProtectedRoute>} />
           
         
       
            <Route path='/storedetails' element={<ProtectedRoute><StoreDetails/></ProtectedRoute>}/>
            <Route path='/invoice' element={<ProtectedRoute><Home/></ProtectedRoute>}/> 
            </Routes> 
          
        
      
            </HashRouter>
    // </BrowserRouter>
  )
}

export default App
