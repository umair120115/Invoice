// import api from "../api"
// import { useState, useEffect } from "react";
// import AuthNavbar from "../Navbar/AuthenticatedNavbar";


// function WinnerDetails(){
//     const [winnerDetail,SetwinnerDetail]=useState([]);

//     useEffect(
//         ()=>{
//             getWinnerList();
//         },[]
//     )

//     const getWinnerList=async ()=>{
//         const res = await api.get('/api/games/winner/list/')
//         SetwinnerDetail(res.data.listWinners);
//         console.log(res.data.listWinners)
//     }



//     return <>
//     <AuthNavbar/>
//     <h3>Winner's List</h3>
//     <table>
//         <thead>
//             <tr>
//                 <th>Sr.No.</th>
//                 <th>Customer Name</th>
//                 <th>Customer Phone</th>
//                 <th>Customer Email</th>
//                 <th>Game Name</th>
//                 <th>Store Name</th>
//                 <th>Prize Name</th>
//                 <th>Date of Expiry</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//                 winnerDetail.map((item,id)=>{
//                     return (
//                         <tr>
//                             <td>{id+1}</td>
//                             <td>{item.customerName}</td>
//                             <td>{item.customerPhone}</td>
//                             <td>{item.customerEmail}</td>
//                             <td>{item.gameName}</td>
//                             <td>{item.storeName}</td>
//                             <td>{item.prizeName}</td>
//                             <td>{item.expiryTime}</td>
//                         </tr>
//                     )
//                 }

//                 )
//             }
//         </tbody>
//     </table>
    
    
//     </>
// }
// export default WinnerDetails;
import React, { useState, useEffect } from "react";
import api from "../api";
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
import '../styles/winnerList.css'
function WinnerDetails() {
    const [winnerDetail, SetwinnerDetail] = useState([]);

    useEffect(() => {
        getWinnerList();
    }, []);

    const getWinnerList = async () => {
        try {
            const res = await api.get('/api/games/winner/list/');
            // Ensure res.data.listWinners is an array
            if (Array.isArray(res.data.listWinners)) {
                SetwinnerDetail(res.data.listWinners);
            } else {
                console.error("API did not return an array for listWinners:", res.data.listWinners);
                SetwinnerDetail([]); // Set to empty array to prevent .map error
            }
        } catch (error) {
            console.error("Failed to fetch winner list:", error);
            SetwinnerDetail([]); // Also set to empty on error
        }
    };

    return (
        <>
            <AuthNavbar />
            <div className="winner-details-container"> {/* Added a wrapper div */}
                <div className="heading-container"> {/* Wrapper for h3 for better centering of border */}
                    <h3>Winner's List</h3>
                </div>
                {winnerDetail.length > 0 ? ( // Conditional rendering for the table
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Customer Name</th>
                                <th>Customer Phone</th>
                                <th>Customer Email</th>
                                <th>Game Name</th>
                                <th>Store Name</th>
                                <th>Prize Name</th>
                                <th>Played At</th>
                                <th>Date of Expiry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {winnerDetail.map((item, id) => (
                                <tr key={item.id || id}> {/* Added a key prop */}
                                    <td>{id + 1}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.customerPhone}</td>
                                    <td>{item.customerEmail}</td>
                                    <td>{item.gameName}</td>
                                    <td>{item.storeName}</td>
                                    <td>{item.prizeName}</td>
                                    <td>{item.playedAt}</td>
                                    <td>{item.expiryTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No winner details available at the moment.</p> // Message for no data
                )}
            </div>
        </>
    );
}

export default WinnerDetails;