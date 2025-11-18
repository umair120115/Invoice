// import React, { useState, useMemo, useEffect } from 'react';
// import { Search, Filter, Package, Clock, CheckCircle, XCircle, AlertCircle, Store, Calendar, DollarSign, Phone, MapPin, User } from 'lucide-react';
// import api from '../api';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../components/Footer';
// const styles = {
//   container: {
//     minHeight: '100vh',
//     backgroundColor: '#f9fafb',
//     padding: '24px'
//   },
//   header: {
//     marginBottom: '32px'
//   },
//   title: {
//     fontSize: '30px',
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: '8px'
//   },
//   subtitle: {
//     color: '#6b7280'
//   },
//   statsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '16px',
//     marginBottom: '24px'
//   },
//   statCard: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     padding: '24px'
//   },
//   statCardInner: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   statLabel: {
//     color: '#6b7280',
//     fontSize: '14px',
//     marginBottom: '4px'
//   },
//   statValue: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#111827'
//   },
//   filterCard: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     padding: '24px',
//     marginBottom: '24px'
//   },
//   filterGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '16px'
//   },
//   inputWrapper: {
//     position: 'relative'
//   },
//   iconLeft: {
//     position: 'absolute',
//     left: '12px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#9ca3af'
//   },
//   input: {
//     width: '100%',
//     paddingLeft: '40px',
//     paddingRight: '16px',
//     paddingTop: '8px',
//     paddingBottom: '8px',
//     border: '1px solid #d1d5db',
//     borderRadius: '8px',
//     fontSize: '14px',
//     outline: 'none'
//   },
//   select: {
//     width: '100%',
//     paddingLeft: '40px',
//     paddingRight: '16px',
//     paddingTop: '8px',
//     paddingBottom: '8px',
//     border: '1px solid #d1d5db',
//     borderRadius: '8px',
//     fontSize: '14px',
//     backgroundColor: 'white',
//     outline: 'none',
//     cursor: 'pointer'
//   },
//   tableCard: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     overflow: 'hidden'
//   },
//   tableWrapper: {
//     overflowX: 'auto'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   thead: {
//     backgroundColor: '#f9fafb',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   th: {
//     padding: '12px 24px',
//     textAlign: 'left',
//     fontSize: '11px',
//     fontWeight: '500',
//     color: '#6b7280',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em'
//   },
//   tr: {
//     borderBottom: '1px solid #e5e7eb',
//     transition: 'background-color 0.2s'
//   },
//   td: {
//     padding: '16px 24px',
//     whiteSpace: 'nowrap'
//   },
//   statusBadge: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     padding: '4px 10px',
//     borderRadius: '9999px',
//     fontSize: '12px',
//     fontWeight: '500'
//   },
//   button: {
//     padding: '4px 8px',
//     border: '1px solid #d1d5db',
//     borderRadius: '4px',
//     fontSize: '14px',
//     backgroundColor: 'white',
//     cursor: 'pointer',
//     outline: 'none'
//   },
//   viewButton: {
//     marginLeft: '8px',
//     color: '#2563eb',
//     fontWeight: '500',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     fontSize: '14px'
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: '48px'
//   },
//   modal: {
//     position: 'fixed',
//     inset: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '16px',
//     zIndex: 50
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
//     maxWidth: '672px',
//     width: '100%',
//     maxHeight: '90vh',
//     overflowY: 'auto'
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '24px'
//   },
//   modalTitle: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#111827'
//   },
//   closeButton: {
//     color: '#9ca3af',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     padding: 0
//   },
//   section: {
//     borderBottom: '1px solid #e5e7eb',
//     paddingBottom: '16px',
//     marginBottom: '24px'
//   },
//   sectionTitle: {
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: '12px'
//   }
// };

// const OrderManagementDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedStore, setSelectedStore] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const stores = useMemo(() => {
//     const storeSet = new Set();
//     orders.forEach(order => {
//       order.products.forEach(product => {
//         if (product.store_name) storeSet.add(product.store_name);
//       });
//     });
//     return ['all', ...Array.from(storeSet)];
//   }, [orders]);

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const getOrders = async () => {
//     try {
//     //   Replace with your actual API call
//       const response = await api.get('/api/orders/multiple-store-orders/');
//     //   const data = await response.json();
//       setOrders(response.data.orders);
    
      
//       // Sample data for demonstration
//     //   setOrders([]);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     }
//   };

//   const statusConfig = {
//     pending: { color: { backgroundColor: '#fef3c7', color: '#92400e' }, icon: Clock, label: 'Pending' },
//     confirmed: { color: { backgroundColor: '#dbeafe', color: '#1e40af' }, icon: CheckCircle, label: 'Confirmed' },
//     ready_to_pickup: { color: { backgroundColor: '#e9d5ff', color: '#6b21a8' }, icon: Package, label: 'Ready to Pickup' },
//     completed: { color: { backgroundColor: '#d1fae5', color: '#065f46' }, icon: CheckCircle, label: 'Completed' },
//     decline: { color: { backgroundColor: '#fee2e2', color: '#991b1b' }, icon: XCircle, label: 'Declined' }
//   };

//   const filteredOrders = useMemo(() => {
//     return orders.filter(order => {
//       const matchesStore = selectedStore === 'all' || 
//         order.products.some(p => p.store_name === selectedStore);
//       const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
//       const matchesSearch = searchTerm === '' ||
//         order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.user_name.toLowerCase().includes(searchTerm.toLowerCase());
      
//       return matchesStore && matchesStatus && matchesSearch;
//     });
//   }, [orders, selectedStore, selectedStatus, searchTerm]);

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       setOrders(prevOrders => 
//         prevOrders.map(order => 
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
      
//       if (selectedOrder?.id === orderId) {
//         setSelectedOrder(prev => ({ ...prev, status: newStatus }));
//       }
      
//       console.log(`Order ${orderId} updated to ${newStatus}`);
//     } catch (error) {
//       console.error('Failed to update order:', error);
//     }
//   };

//   const stats = useMemo(() => {
//     const filtered = selectedStore === 'all' ? orders : orders.filter(order =>
//       order.products.some(p => p.store_name === selectedStore)
//     );
    
//     return {
//       total: filtered.length,
//       pending: filtered.filter(o => o.status === 'pending').length,
//       confirmed: filtered.filter(o => o.status === 'confirmed').length,
//       completed: filtered.filter(o => o.status === 'completed').length,
//       revenue: filtered.reduce((sum, o) => sum + parseFloat(o.total || 0), 0).toFixed(2)
//     };
//   }, [orders, selectedStore]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//    <>

//    <Navbar/>

//    <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Order Management</h1>
//         <p style={styles.subtitle}>Manage and track all your store orders</p>
//       </div>

//       <div style={styles.statsGrid}>
//         <div style={styles.statCard}>
//           <div style={styles.statCardInner}>
//             <div>
//               <p style={styles.statLabel}>Total Orders</p>
//               <p style={styles.statValue}>{stats.total}</p>
//             </div>
//             <Package size={32} color="#3b82f6" />
//           </div>
//         </div>
        
//         <div style={styles.statCard}>
//           <div style={styles.statCardInner}>
//             <div>
//               <p style={styles.statLabel}>Pending</p>
//               <p style={{...styles.statValue, color: '#d97706'}}>{stats.pending}</p>
//             </div>
//             <Clock size={32} color="#f59e0b" />
//           </div>
//         </div>
        
//         <div style={styles.statCard}>
//           <div style={styles.statCardInner}>
//             <div>
//               <p style={styles.statLabel}>Confirmed</p>
//               <p style={{...styles.statValue, color: '#2563eb'}}>{stats.confirmed}</p>
//             </div>
//             <CheckCircle size={32} color="#3b82f6" />
//           </div>
//         </div>
        
//         <div style={styles.statCard}>
//           <div style={styles.statCardInner}>
//             <div>
//               <p style={styles.statLabel}>Completed</p>
//               <p style={{...styles.statValue, color: '#059669'}}>{stats.completed}</p>
//             </div>
//             <CheckCircle size={32} color="#10b981" />
//           </div>
//         </div>
        
//         <div style={styles.statCard}>
//           <div style={styles.statCardInner}>
//             <div>
//               <p style={styles.statLabel}>Revenue</p>
//               <p style={styles.statValue}>${stats.revenue}</p>
//             </div>
//             <DollarSign size={32} color="#10b981" />
//           </div>
//         </div>
//       </div>

//       <div style={styles.filterCard}>
//         <div style={styles.filterGrid}>
//           <div style={styles.inputWrapper}>
//             <Search style={styles.iconLeft} size={20} />
//             <input
//               type="text"
//               placeholder="Search by order ID or customer name..."
//               style={styles.input}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div style={styles.inputWrapper}>
//             <Store style={styles.iconLeft} size={20} />
//             <select
//               style={styles.select}
//               value={selectedStore}
//               onChange={(e) => setSelectedStore(e.target.value)}
//             >
//               {stores.map(store => (
//                 <option key={store} value={store}>
//                   {store === 'all' ? 'All Stores' : store}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div style={styles.inputWrapper}>
//             <Filter style={styles.iconLeft} size={20} />
//             <select
//               style={styles.select}
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//             >
//               <option value="all">All Statuses</option>
//               {Object.entries(statusConfig).map(([key, config]) => (
//                 <option key={key} value={key}>{config.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div style={styles.tableCard}>
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead style={styles.thead}>
//               <tr>
//                 <th style={styles.th}>Order ID</th>
//                 <th style={styles.th}>Customer</th>
//                 <th style={styles.th}>Store</th>
//                 <th style={styles.th}>Date</th>
//                 <th style={styles.th}>Total</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => {
//                 const StatusIcon = statusConfig[order.status]?.icon || AlertCircle;
//                 const storeName = order.products[0]?.store_name || 'N/A';
                
//                 return (
//                   <tr 
//                     key={order.id} 
//                     style={styles.tr}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
//                   >
//                     <td style={styles.td}>
//                       <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>{order.order_id}</div>
//                       <div style={{fontSize: '12px', color: '#6b7280'}}>{order.order_type.toUpperCase()}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{display: 'flex', alignItems: 'center'}}>
//                         <User size={16} color="#9ca3af" style={{marginRight: '8px'}} />
//                         <div>
//                           <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>{order.user_name}</div>
//                           {/* <div style={{fontSize: '12px', color: '#6b7280'}}>{order.user_phone}</div> */}
//                         </div>
//                       </div>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{fontSize: '14px', color: '#111827'}}>{storeName}</div>
//                       <div style={{fontSize: '12px', color: '#6b7280'}}>{order.products.length} item(s)</div>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{fontSize: '14px', color: '#111827'}}>{formatDate(order.order_date)}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>${order.total}</div>
//                       <div style={{fontSize: '12px', color: '#6b7280'}}>{order.payment_type}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{...styles.statusBadge, ...statusConfig[order.status]?.color}}>
//                         <StatusIcon size={12} style={{marginRight: '4px'}} />
//                         {statusConfig[order.status]?.label || order.status}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <select
//                         style={styles.button}
//                         value={order.status}
//                         onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                       >
//                         {Object.entries(statusConfig).map(([key, config]) => (
//                           <option key={key} value={key}>{config.label}</option>
//                         ))}
//                       </select>
//                       <button
//                         onClick={() => setSelectedOrder(order)}
//                         style={styles.viewButton}
//                         onMouseEnter={(e) => e.target.style.color = '#1e40af'}
//                         onMouseLeave={(e) => e.target.style.color = '#2563eb'}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredOrders.length === 0 && (
//           <div style={styles.emptyState}>
//             <Package size={48} color="#9ca3af" style={{margin: '0 auto 16px'}} />
//             <p style={{color: '#6b7280'}}>No orders found</p>
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <div style={styles.modal} onClick={() => setSelectedOrder(null)}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <div style={{padding: '24px'}}>
//               <div style={styles.modalHeader}>
//                 <div>
//                   <h2 style={styles.modalTitle}>{selectedOrder.order_id}</h2>
//                   <p style={{color: '#6b7280', marginTop: '4px'}}>{formatDate(selectedOrder.order_date)}</p>
//                 </div>
//                 <button onClick={() => setSelectedOrder(null)} style={styles.closeButton}>
//                   <XCircle size={24} />
//                 </button>
//               </div>

//               <div>
//                 <div style={styles.section}>
//                   <h3 style={styles.sectionTitle}>Customer Information</h3>
//                   <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
//                     <div style={{display: 'flex', alignItems: 'center'}}>
//                       <User size={16} color="#9ca3af" style={{marginRight: '8px'}} />
//                       <span style={{fontSize: '14px', color: '#6b7280'}}>{selectedOrder.user_name}</span>
//                     </div>
//                     {/* <div style={{display: 'flex', alignItems: 'center'}}> */}
//                       {/* <Phone size={16} color="#9ca3af" style={{marginRight: '8px'}} /> */}
//                       {/* <span style={{fontSize: '14px', color: '#6b7280'}}>{selectedOrder.user_phone}</span> */}
//                     {/* </div> */}
//                     {selectedOrder.shipping_address && (
//                       <div style={{display: 'flex', alignItems: 'flex-start', gridColumn: '1 / -1'}}>
//                         <MapPin size={16} color="#9ca3af" style={{marginRight: '8px', marginTop: '4px'}} />
//                         <span style={{fontSize: '14px', color: '#6b7280'}}>{selectedOrder.shipping_address}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div style={styles.section}>
//                   <h3 style={styles.sectionTitle}>Order Items</h3>
//                   <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
//                     {selectedOrder.products.map((product, idx) => (
//                       <div key={idx} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '4px'}}>
//                         <div>
//                           <p style={{fontWeight: '500', color: '#111827'}}>{product.product_name}</p>
//                           <p style={{fontSize: '14px', color: '#6b7280'}}>{product.store_name}</p>
//                         </div>
//                         <div style={{textAlign: 'right'}}>
//                           <p style={{fontWeight: '500', color: '#111827'}}>${product.discount_price}</p>
//                           <p style={{fontSize: '14px', color: '#6b7280'}}>Qty: {product.quantity}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 style={styles.sectionTitle}>Payment Summary</h3>
//                   <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
//                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
//                       <span style={{color: '#6b7280'}}>Subtotal</span>
//                       <span style={{color: '#111827'}}>${selectedOrder.subtotal}</span>
//                     </div>
//                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
//                       <span style={{color: '#6b7280'}}>Tax</span>
//                       <span style={{color: '#111827'}}>${selectedOrder.tax}</span>
//                     </div>
//                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', borderTop: '1px solid #e5e7eb', paddingTop: '8px'}}>
//                       <span>Total</span>
//                       <span>${selectedOrder.total}</span>
//                     </div>
//                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px'}}>
//                       <span style={{color: '#6b7280'}}>Payment Method</span>
//                       <span style={{color: '#111827', textTransform: 'capitalize'}}>{selectedOrder.payment_type}</span>
//                     </div>
//                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
//                       <span style={{color: '#6b7280'}}>Payment Status</span>
//                       <span style={{fontWeight: '500', color: selectedOrder.payment_status === 'completed' || selectedOrder.payment_status === 'paid' ? '#059669' : '#d97706'}}>
//                         {selectedOrder.payment_status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
   
//    <Footer/>
   
   
   
//    </>
    
//   );
// };

// export default OrderManagementDashboard;














import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Package, Clock, CheckCircle, XCircle, AlertCircle, Store, Calendar, DollarSign, Phone, MapPin, User } from 'lucide-react';
import api from '../api';
import Navbar from '../Navbar/Navbar';
import Footer from '../components/Footer';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '24px'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  statCardInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '4px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  filterCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  inputWrapper: {
    position: 'relative'
  },
  iconLeft: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  select: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer'
  },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  },
  th: {
    padding: '12px 24px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '16px 24px',
    whiteSpace: 'nowrap'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500'
  },
  button: {
    padding: '4px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none'
  },
  viewButton: {
    marginLeft: '8px',
    color: '#2563eb',
    fontWeight: '500',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '14px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 50
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
    maxWidth: '672px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  closeButton: {
    color: '#9ca3af',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0
  },
  section: {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '16px',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  },
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 100,
    minWidth: '300px',
    animation: 'slideIn 0.3s ease-out'
  },
  toastSuccess: {
    borderLeft: '4px solid #10b981'
  },
  toastError: {
    borderLeft: '4px solid #ef4444'
  }
};

const OrderManagementDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [updatingOrders, setUpdatingOrders] = useState(new Set());

  const stores = useMemo(() => {
    const storeSet = new Set();
    orders.forEach(order => {
      order.products.forEach(product => {
        if (product.store_name) storeSet.add(product.store_name);
      });
    });
    return ['all', ...Array.from(storeSet)];
  }, [orders]);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const getOrders = async () => {
    try {
      const response = await api.get('/api/orders/multiple-store-orders/');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      showToast('Failed to fetch orders', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const statusConfig = {
    pending: { color: { backgroundColor: '#fef3c7', color: '#92400e' }, icon: Clock, label: 'Pending' },
    confirmed: { color: { backgroundColor: '#dbeafe', color: '#1e40af' }, icon: CheckCircle, label: 'Confirmed' },
    ready_to_pickup: { color: { backgroundColor: '#e9d5ff', color: '#6b21a8' }, icon: Package, label: 'Ready to Pickup' },
    completed: { color: { backgroundColor: '#d1fae5', color: '#065f46' }, icon: CheckCircle, label: 'Completed' },
    decline: { color: { backgroundColor: '#fee2e2', color: '#991b1b' }, icon: XCircle, label: 'Declined' }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStore = selectedStore === 'all' || 
        order.products.some(p => p.store_name === selectedStore);
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesSearch = searchTerm === '' ||
        order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStore && matchesStatus && matchesSearch;
    });
  }, [orders, selectedStore, selectedStatus, searchTerm]);

  const updateOrderStatus = async (orderId, newStatus) => {
    // Prevent multiple simultaneous updates for the same order
    if (updatingOrders.has(orderId)) {
      return;
    }

    // Store the previous status for rollback
    const previousOrder = orders.find(order => order.id === orderId);
    const previousStatus = previousOrder?.status;

    try {
      // Mark this order as being updated
      setUpdatingOrders(prev => new Set([...prev, orderId]));

      // Optimistically update the UI
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }

      // Make the API call to update the status
      const res=await api.patch(`/api/orders/${orderId}/multiple-store-orders/`, {
        status: newStatus
      });
      console.log("Response",res.data)

      showToast(`Order status updated to ${statusConfig[newStatus]?.label || newStatus}`, 'success');
      
    } catch (error) {
      console.error('Failed to update order status:', error);
      
      // Rollback the optimistic update
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: previousStatus } : order
        )
      );
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: previousStatus }));
      }

      showToast(
        error.response?.data?.message || 'Failed to update order status. Please try again.',
        'error'
      );
    } finally {
      // Remove the order from the updating set
      setUpdatingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const stats = useMemo(() => {
    const filtered = selectedStore === 'all' ? orders : orders.filter(order =>
      order.products.some(p => p.store_name === selectedStore)
    );
    
    return {
      total: filtered.length,
      pending: filtered.filter(o => o.status === 'pending').length,
      confirmed: filtered.filter(o => o.status === 'confirmed').length,
      completed: filtered.filter(o => o.status === 'completed').length,
      revenue: filtered.reduce((sum, o) => sum + parseFloat(o.total || 0), 0).toFixed(2)
    };
  }, [orders, selectedStore]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
   <>
   <Navbar/>

   <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Order Management</h1>
        <p style={styles.subtitle}>Manage and track all your store orders</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statCardInner}>
            <div>
              <p style={styles.statLabel}>Total Orders</p>
              <p style={styles.statValue}>{stats.total}</p>
            </div>
            <Package size={32} color="#3b82f6" />
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statCardInner}>
            <div>
              <p style={styles.statLabel}>Pending</p>
              <p style={{...styles.statValue, color: '#d97706'}}>{stats.pending}</p>
            </div>
            <Clock size={32} color="#f59e0b" />
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statCardInner}>
            <div>
              <p style={styles.statLabel}>Confirmed</p>
              <p style={{...styles.statValue, color: '#2563eb'}}>{stats.confirmed}</p>
            </div>
            <CheckCircle size={32} color="#3b82f6" />
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statCardInner}>
            <div>
              <p style={styles.statLabel}>Completed</p>
              <p style={{...styles.statValue, color: '#059669'}}>{stats.completed}</p>
            </div>
            <CheckCircle size={32} color="#10b981" />
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statCardInner}>
            <div>
              <p style={styles.statLabel}>Revenue</p>
              <p style={styles.statValue}>${stats.revenue}</p>
            </div>
            <DollarSign size={32} color="#10b981" />
          </div>
        </div>
      </div>

      <div style={styles.filterCard}>
        <div style={styles.filterGrid}>
          <div style={styles.inputWrapper}>
            <Search style={styles.iconLeft} size={20} />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              style={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.inputWrapper}>
            <Store style={styles.iconLeft} size={20} />
            <select
              style={styles.select}
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              {stores.map(store => (
                <option key={store} value={store}>
                  {store === 'all' ? 'All Stores' : store}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputWrapper}>
            <Filter style={styles.iconLeft} size={20} />
            <select
              style={styles.select}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Store</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || AlertCircle;
                const storeName = order.products[0]?.store_name || 'N/A';
                const isUpdating = updatingOrders.has(order.id);
                
                return (
                  <tr 
                    key={order.id} 
                    style={styles.tr}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <td style={styles.td}>
                      <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>{order.order_id}</div>
                      <div style={{fontSize: '12px', color: '#6b7280'}}>{order.order_type.toUpperCase()}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <User size={16} color="#9ca3af" style={{marginRight: '8px'}} />
                        <div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>{order.user_name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{fontSize: '14px', color: '#111827'}}>{storeName}</div>
                      <div style={{fontSize: '12px', color: '#6b7280'}}>{order.products.length} item(s)</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{fontSize: '14px', color: '#111827'}}>{formatDate(order.order_date)}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{fontSize: '14px', fontWeight: '500', color: '#111827'}}>${order.total}</div>
                      <div style={{fontSize: '12px', color: '#6b7280'}}>{order.payment_type}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{...styles.statusBadge, ...statusConfig[order.status]?.color}}>
                        <StatusIcon size={12} style={{marginRight: '4px'}} />
                        {statusConfig[order.status]?.label || order.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <select
                        style={{
                          ...styles.button,
                          opacity: isUpdating ? 0.6 : 1,
                          cursor: isUpdating ? 'wait' : 'pointer'
                        }}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        disabled={isUpdating}
                      >
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <option key={key} value={key}>{config.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={styles.viewButton}
                        onMouseEnter={(e) => e.target.style.color = '#1e40af'}
                        onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div style={styles.emptyState}>
            <Package size={48} color="#9ca3af" style={{margin: '0 auto 16px'}} />
            <p style={{color: '#6b7280'}}>No orders found</p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div style={styles.modal} onClick={() => setSelectedOrder(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{padding: '24px'}}>
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={styles.modalTitle}>{selectedOrder.order_id}</h2>
                  <p style={{color: '#6b7280', marginTop: '4px'}}>{formatDate(selectedOrder.order_date)}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} style={styles.closeButton}>
                  <XCircle size={24} />
                </button>
              </div>

              <div>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Customer Information</h3>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <User size={16} color="#9ca3af" style={{marginRight: '8px'}} />
                      <span style={{fontSize: '14px', color: '#6b7280'}}>{selectedOrder.user_name}</span>
                    </div>
                    {selectedOrder.shipping_address && (
                      <div style={{display: 'flex', alignItems: 'flex-start', gridColumn: '1 / -1'}}>
                        <MapPin size={16} color="#9ca3af" style={{marginRight: '8px', marginTop: '4px'}} />
                        <span style={{fontSize: '14px', color: '#6b7280'}}>{selectedOrder.shipping_address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Order Items</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {selectedOrder.products.map((product, idx) => (
                      <div key={idx} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '4px'}}>
                        <div>
                          <p style={{fontWeight: '500', color: '#111827'}}>{product.product_name}</p>
                          <p style={{fontSize: '14px', color: '#6b7280'}}>{product.store_name}</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <p style={{fontWeight: '500', color: '#111827'}}>${product.discount_price}</p>
                          <p style={{fontSize: '14px', color: '#6b7280'}}>Qty: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={styles.sectionTitle}>Payment Summary</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                      <span style={{color: '#6b7280'}}>Subtotal</span>
                      <span style={{color: '#111827'}}>${selectedOrder.subtotal}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                      <span style={{color: '#6b7280'}}>Tax</span>
                      <span style={{color: '#111827'}}>${selectedOrder.tax}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', borderTop: '1px solid #e5e7eb', paddingTop: '8px'}}>
                      <span>Total</span>
                      <span>${selectedOrder.total}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px'}}>
                      <span style={{color: '#6b7280'}}>Payment Method</span>
                      <span style={{color: '#111827', textTransform: 'capitalize'}}>{selectedOrder.payment_type}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                      <span style={{color: '#6b7280'}}>Payment Status</span>
                      <span style={{fontWeight: '500', color: selectedOrder.payment_status === 'completed' || selectedOrder.payment_status === 'paid' ? '#059669' : '#d97706'}}>
                        {selectedOrder.payment_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{
          ...styles.toast,
          ...(toast.type === 'success' ? styles.toastSuccess : styles.toastError)
        }}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} color="#10b981" />
          ) : (
            <XCircle size={20} color="#ef4444" />
          )}
          <span style={{fontSize: '14px', color: '#111827'}}>{toast.message}</span>
        </div>
      )}
    </div>
   
   <Footer/>
   </>
  );
};

export default OrderManagementDashboard;