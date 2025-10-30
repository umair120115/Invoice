import React, { useState , useEffect} from 'react';
import { Package, User, Phone, MapPin, Calendar, DollarSign, ShoppingCart, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import api from '../api';
import Footer from '../components/Footer';
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto',
    marginBottom: '24px',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  statsContainer: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  statBox: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  },
  filterSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    marginBottom: '24px',
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    color: '#4b5563',
  },
  filterButtonActive: {
    border: '2px solid #3b82f6',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
  },
  ordersContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s',
  },
  orderCardHover: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  },
  orderHeader: {
    padding: '20px',
    borderBottom: '2px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  orderHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  orderIdBadge: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    padding: '8px 12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
  },
  orderDate: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusConfirmed: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  statusReady: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  statusDecline: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  orderBody: {
    padding: '20px',
  },
  customerInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
  },
  itemsSection: {
    marginTop: '16px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemsList: {
    display: 'grid',
    gap: '12px',
  },
  itemCard: {
    display: 'flex',
    gap: '16px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '6px',
  },
  itemMeta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    fontSize: '13px',
    color: '#6b7280',
  },
  priceInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  originalPrice: {
    fontSize: '12px',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  discountPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#059669',
  },
  discountBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#ef4444',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  orderFooter: {
    padding: '16px 20px',
    backgroundColor: '#f9fafb',
    borderTop: '2px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  totalLabel: {
    fontSize: '13px',
    color: '#6b7280',
  },
  totalValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
};

export default function OrdersDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [ordersData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ totalOrders, setTotalOrders] = useState(0);

  useEffect(()=>{
    getStoreDetails();
  }, [])


  const getStoreDetails = async () => {
      try {
        const response = await api.get(`/api/stores/store-orders/`);
        setOrderData(response.data);
        // setTotalOrders(response.data.total_orders);
        console.log("store Data", response.data);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
        // You could set an error state here
      } finally {
        // This block runs after try OR catch
        setLoading(false);
      }
    }

    if (loading) {
        return (
          <>
            <Navbar />
            <div style={styles.container}>
              <div style={styles.wrapper} >
                Loading store details...
              </div>
            </div>
          </>
        );
      }

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

  const calculateOrderTotal = (items) => {
    return items.reduce((sum, item) => {
      const itemPrice = parseFloat(item.discount_price);
      const addon = item.price_addon ? parseFloat(item.price_addon) : 0;
      return sum + ((itemPrice + addon) * item.quantity);
    }, 0).toFixed(2);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'confirmed':
        return <Clock size={16} />;
      case 'ready_to_pickup':
        return <AlertCircle size={16} />;
      case 'decline':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'completed':
        return styles.statusCompleted;
      case 'confirmed':
        return styles.statusConfirmed;
      case 'ready_to_pickup':
        return styles.statusReady;
      case 'decline':
        return styles.statusDecline;
      default:
        return styles.statusConfirmed;
    }
  };

  const filteredOrders = selectedFilter === 'all' 
    ? ordersData.orders 
    : ordersData.orders.filter(order => order.status === selectedFilter);

  const isToday = (dateString) => {
    const orderDate = new Date(dateString);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  };

  const isThisWeek = (dateString) => {
    const orderDate = new Date(dateString);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return orderDate >= weekStart && orderDate <= weekEnd;
  };

  const isThisMonth = (dateString) => {
    const orderDate = new Date(dateString);
    const today = new Date();
    return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
  };

  const applyDateFilter = (orders) => {
    switch(dateFilter) {
      case 'today':
        return orders.filter(order => isToday(order.created_at));
      case 'week':
        return orders.filter(order => isThisWeek(order.created_at));
      case 'month':
        return orders.filter(order => isThisMonth(order.created_at));
      default:
        return orders;
    }
  };

  const dateFilteredOrders = applyDateFilter(
    selectedFilter === 'all' 
      ? ordersData.orders 
      : ordersData.orders.filter(order => order.status === selectedFilter)
  );

  const statusCounts = {
    all: ordersData.orders.length,
    completed: ordersData.orders.filter(o => o.status === 'completed').length,
    confirmed: ordersData.orders.filter(o => o.status === 'confirmed').length,
    ready_to_pickup: ordersData.orders.filter(o => o.status === 'ready_to_pickup').length,
    decline: ordersData.orders.filter(o => o.status === 'decline').length,
  };

  return (
    <>
    <Navbar/>
    

    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerCard}>
          <div>
            <h1 style={styles.headerTitle}>Orders Dashboard</h1>
            <p style={styles.headerSubtitle}>Manage and track all your store orders</p>
          </div>
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <p style={styles.statValue}>{ordersData.total_orders}</p>
              <p style={styles.statLabel}>Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        <div style={styles.filterCard}>
          <span style={styles.filterLabel}>Filter by Status:</span>
          <button
            style={{
              ...styles.filterButton,
              ...(selectedFilter === 'all' ? styles.filterButtonActive : {})
            }}
            onClick={() => setSelectedFilter('all')}
          >
            All ({statusCounts.all})
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(selectedFilter === 'completed' ? styles.filterButtonActive : {})
            }}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed ({statusCounts.completed})
          </button>
          {/* <button
            style={{
              ...styles.filterButton,
              ...(selectedFilter === 'confirmed' ? styles.filterButtonActive : {})
            }}
            onClick={() => setSelectedFilter('confirmed')}
          >
            Confirmed ({statusCounts.confirmed})
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(selectedFilter === 'ready_to_pickup' ? styles.filterButtonActive : {})
            }}
            onClick={() => setSelectedFilter('ready_to_pickup')}
          >
            Ready to Pickup ({statusCounts.ready_to_pickup})
          </button> */}
          <button
            style={{
              ...styles.filterButton,
              ...(selectedFilter === 'decline' ? styles.filterButtonActive : {})
            }}
            onClick={() => setSelectedFilter('decline')}
          >
            Declined ({statusCounts.decline})
          </button>
        </div>

        <div style={{...styles.filterCard, marginTop: '12px'}}>
          <span style={styles.filterLabel}>Filter by Date:</span>
          <button
            style={{
              ...styles.filterButton,
              ...(dateFilter === 'all' ? styles.filterButtonActive : {})
            }}
            onClick={() => setDateFilter('all')}
          >
            All Time
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(dateFilter === 'today' ? styles.filterButtonActive : {})
            }}
            onClick={() => setDateFilter('today')}
          >
            Today
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(dateFilter === 'week' ? styles.filterButtonActive : {})
            }}
            onClick={() => setDateFilter('week')}
          >
            This Week
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(dateFilter === 'month' ? styles.filterButtonActive : {})
            }}
            onClick={() => setDateFilter('month')}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div style={styles.ordersContainer}>
        {dateFilteredOrders.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h3>No orders found</h3>
            <p>There are no orders matching the selected filter.</p>
          </div>
        ) : (
          dateFilteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                ...styles.orderCard,
                ...(hoveredCard === order.id ? styles.orderCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(order.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Order Header */}
              <div style={styles.orderHeader}>
                <div style={styles.orderHeaderLeft}>
                  <span style={styles.orderIdBadge}>
                    <Package size={16} style={{display: 'inline', marginRight: '6px', verticalAlign: 'middle'}} />
                    {order.order_id}
                  </span>
                  <span style={styles.orderDate}>
                    <Calendar size={14} />
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <span style={{...styles.statusBadge, ...getStatusStyle(order.status)}}>
                  {getStatusIcon(order.status)}
                  {order.status_display}
                </span>
              </div>

              {/* Order Body */}
              <div style={styles.orderBody}>
                {/* Customer Info */}
                <div style={styles.customerInfo}>
                  <div style={styles.infoItem}>
                    <User size={16} style={{color: '#6b7280'}} />
                    <div>
                      <div style={styles.infoLabel}>Customer Name</div>
                      <div style={styles.infoValue}>{order.user_name || "Guest"}</div>
                    </div>
                  </div>
                  {/* <div style={styles.infoItem}>
                    <Phone size={16} style={{color: '#6b7280'}} />
                    <div>
                      <div style={styles.infoLabel}>Contact</div>
                      <div style={styles.infoValue}>{order.contact_number}</div>
                    </div>
                  </div> */}
                  {order.shipping_address.trim() && (
                    <div style={styles.infoItem}>
                      <MapPin size={16} style={{color: '#6b7280'}} />
                      <div>
                        <div style={styles.infoLabel}>Address</div>
                        <div style={styles.infoValue}>{order.shipping_address}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div style={styles.itemsSection}>
                  <h3 style={styles.sectionTitle}>
                    <ShoppingCart size={18} />
                    Order Items ({order.store_items.length})
                  </h3>
                  <div style={styles.itemsList}>
                    {order.store_items.map((item, idx) => (
                      <div key={idx} style={styles.itemCard}>
                        <img 
                          src={item.product.image_url} 
                          alt={item.product.name}
                          style={styles.itemImage}
                        />
                        <div style={styles.itemDetails}>
                          <div style={styles.itemName}>{item.product.name}</div>
                          <div style={styles.itemMeta}>
                            <span>Quantity: <strong>{item.quantity}</strong></span>
                            {item.price_addon && (
                              <span>Add-on: <strong>${item.price_addon}</strong></span>
                            )}
                            <span style={styles.discountBadge}>
                              {item.product.discount_percentage}% OFF
                            </span>
                          </div>
                        </div>
                        <div style={styles.priceInfo}>
                          <span style={styles.originalPrice}>${item.product.price}</span>
                          <span style={styles.discountPrice}>
                            ${(parseFloat(item.discount_price) + (item.price_addon ? parseFloat(item.price_addon) : 0)).toFixed(2)} 
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div style={styles.orderFooter}>
                <div style={styles.totalSection}>
                  <span style={styles.totalLabel}>Order Total  + including 10% of savings as platform fee!</span>
                  <span style={styles.totalValue}>
                    <DollarSign size={20} style={{display: 'inline', verticalAlign: 'middle'}} />
                    {calculateOrderTotal(order.store_items)} 
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}