import React, { useState, useEffect, useMemo } from "react";
import api from "../api"; // Assuming api.js is correctly set up
import AuthNavbar from "../Navbar/AuthenticatedNavbar"; // Assuming this component exists
import '../styles/winnerList.css'; // Your CSS file
import Navbar from "../Navbar/Navbar";

function WinnerDetails() {
    const [winnerDetail, setWinnerDetail] = useState([]);
    const [selectedWinnerIds, setSelectedWinnerIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true); // For loading state

    useEffect(() => {
        getWinnerList();
    }, []);

    const getWinnerList = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/api/games/winner/list/');
            if (Array.isArray(res.data.listWinners)) {
                // Ensure each item has a unique ID. If not present, you might need to generate one client-side,
                // but API-provided IDs are always better. For this example, we assume item.id exists and is unique.
                setWinnerDetail(res.data.listWinners.map(winner => ({...winner, id: winner.id || winner.winnerId || String(Math.random()) }) )); // Ensure an id field
            } else {
                console.error("API did not return an array for listWinners:", res.data.listWinners);
                setWinnerDetail([]);
            }
        } catch (error) {
            console.error("Failed to fetch winner list:", error);
            setWinnerDetail([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Memoize derived state for performance
    const allDisplayedIds = useMemo(() => winnerDetail.map(item => item.id), [winnerDetail]);

    const handleSelectRow = (winnerId) => {
        setSelectedWinnerIds(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(winnerId)) {
                newSelected.delete(winnerId);
            } else {
                newSelected.add(winnerId);
            }
            return newSelected;
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedWinnerIds(new Set(allDisplayedIds));
            console.log(selectedWinnerIds)
        } else {
            setSelectedWinnerIds(new Set());
        }
    };

    const handleSelectExpired = () => {
        const now = new Date();
        const expiredIds = new Set(selectedWinnerIds); // Start with currently selected
        winnerDetail.forEach(item => {
            try {
                console.log(item.expiry_time)
                const expiryDate = new Date(item.expiry_time);
                if (expiryDate < now) {
                    expiredIds.add(item.id);
                }

            } catch (e) {
                console.warn(`Invalid expiryTime format for winner ID ${item.id}: ${item.expiryTime}`);
            }
        });
        setSelectedWinnerIds(expiredIds);
        console.log(expiredIds);
    };

    const handleSelectBetterLuck = () => {
        const betterLuckIds = new Set(selectedWinnerIds); // Start with currently selected
        winnerDetail.forEach(item => {
            if (item.prizeName && item.prizeName.toLowerCase() === "better luck next time") {
                betterLuckIds.add(item.id);
            }
        });
        setSelectedWinnerIds(betterLuckIds);
        console.log(betterLuckIds);
    };

    const handleDeleteSelected = async () => {
        if (selectedWinnerIds.size === 0) {
            alert("Please select winners to delete.");
            return;
        }
        // 1. Convert the Set to an Array before sending
        const idsArray = Array.from(selectedWinnerIds);
        const payload = {
            ids: idsArray
        };
        // Example: Log to console. Replace with actual API call.
        const res = await api.delete(`/api/games/winner/list/`,{data:payload})
        alert(res.data.message)
        
        setSelectedWinnerIds(new Set());

        getWinnerList();

        console.log("Deleting winners with IDs:", Array.from(selectedWinnerIds));
        // alert(`Simulating deletion of ${selectedWinnerIds.size} winner(s). Check console.`);
        // Potentially refetch list or remove from local state:
        // setWinnerDetail(prevDetails => prevDetails.filter(item => !selectedWinnerIds.has(item.id)));
        // setSelectedWinnerIds(new Set()); // Clear selection after deletion
    };

    const isAllSelected = useMemo(() => {
        return winnerDetail.length > 0 && selectedWinnerIds.size === allDisplayedIds.length;
    }, [selectedWinnerIds, allDisplayedIds, winnerDetail.length]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric',
                // hour: '2-digit', minute: '2-digit' // Uncomment if time is needed
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };


    return (
        <>
            {/* <AuthNavbar /> */}
            <Navbar/>
            <div className="winner-details-container">
                <div className="heading-container">
                    <h3>Winner's List</h3>
                </div>

                <div className="selection-controls">
                    <button onClick={handleSelectExpired} className="control-button select-expired-button">
                        Select Expired
                    </button>
                    <button onClick={handleSelectBetterLuck} className="control-button select-blnt-button">
                        Select "Better Luck Next Time"
                    </button>
                    {selectedWinnerIds.size > 0 && (
                        <button onClick={handleDeleteSelected} className="control-button delete-selected-button">
                            Delete ({selectedWinnerIds.size}) Selected
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <p className="loading-message">Loading winner details...</p>
                ) : winnerDetail.length > 0 ? (
                    <div className="table-responsive-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th className="checkbox-cell">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                            disabled={winnerDetail.length === 0}
                                            aria-label="Select all winners"
                                        />
                                    </th>
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
                                {winnerDetail.map((item, index) => (
                                    <tr key={item.id || index} className={selectedWinnerIds.has(item.id) ? "selected" : ""}>
                                        <td className="checkbox-cell">
                                            <input
                                                type="checkbox"
                                                checked={selectedWinnerIds.has(item.id)}
                                                onChange={() => handleSelectRow(item.id)}
                                                aria-labelledby={`customer-name-${item.id}`}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td id={`customer-name-${item.id}`}>{item.customerName || 'N/A'}</td>
                                        <td>{item.customerPhone || 'N/A'}</td>
                                        <td>{item.customerEmail || 'N/A'}</td>
                                        <td>{item.gameName || 'N/A'}</td>
                                        <td>{item.storeName || 'N/A'}</td>
                                        <td>{item.prizeName || 'N/A'}</td>
                                        <td>{(item.playedAt)}</td>
                                        <td>{(item.expiryTime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="no-data-message">No winner details available at the moment.</p>
                )}
            </div>
        </>
    );
}

export default WinnerDetails;