import Navbar from "../Navbar/Navbar";
import React, { useState, useEffect } from 'react';
import { Store, MapPin, Clock, Mail, Phone, TrendingUp, Calendar, ShoppingBag, ShoppingBagIcon, GitGraphIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import api from "../api";
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  wrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  headerBanner: {
    position: 'relative',
    height: '192px',
    background: 'linear-gradient(to right, #f97316, #ef4444, #ec4899)',
  },
  headerOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
  },
  headerFlex: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '24px',
  },
  storeImage: {
    width: '96px',
    height: '96px',
    borderRadius: '12px',
    border: '4px solid white',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
    objectFit: 'cover',
  },
  headerInfo: {
    flex: 1,
    color: 'white',
    paddingBottom: '8px',
  },
  storeName: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '8px',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: '14px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '4px 12px',
    borderRadius: '9999px',
  },
  statusBadge: {
    fontSize: '14px',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontWeight: '500',
  },
  statusOpen: {
    backgroundColor: '#22c55e',
  },
  statusClosed: {
    backgroundColor: '#ef4444',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',
  },
  statCardHover: {
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  statBorder: {
    height: '8px',
  },
  statContent: {
    padding: '24px',
  },
  statFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    margin: 0,
  },
  statValue: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: '4px',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    padding: '24px',
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',
  },
  detailCardHover: {
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  detailIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  detailLabel: {
    color: '#4b5563',
    fontWeight: '500',
  },
  detailValue: {
    color: '#1f2937',
    fontWeight: '600',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  contactText: {
    color: '#4b5563',
  },
  locationCoords: {
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  coordLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
  },
  coordValue: {
    color: '#1f2937',
    fontFamily: 'monospace',
    fontSize: '14px',
  },
  mapButton: {
    width: '100%',
    textAlign: 'center',
    background: 'linear-gradient(to right, #a855f7, #9333ea)',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'block',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
  },
  classificationCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    padding: '24px',
  },
  classificationTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px',
  },
  classificationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  classificationItem: {
    padding: '16px',
    borderRadius: '8px',
  },
  typeItem: {
    background: 'linear-gradient(to bottom right, #fed7aa, #fdba74)',
    border: '1px solid #fb923c',
  },
  categoryItem: {
    background: 'linear-gradient(to bottom right, #fbcfe8, #f9a8d4)',
    border: '1px solid #f472b6',
  },
  classificationLabel: {
    fontSize: '12px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  typeLabel: {
    color: '#c2410c',
  },
  categoryLabel: {
    color: '#be185d',
  },
  classificationValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  typeValue: {
    color: '#9a3412',
  },
  categoryValue: {
    color: '#9f1239',
  },
};

export default function StoreDashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null)
  const [loading, setLoading]=useState(true);
  const [today_orders, setTodayOrders] = useState(0);
  const [weekly_orders,setWeeklyOrders] = useState(0);
  const [monthly_orders, setMonthlyOrders] = useState(0);
  const [total_orders, setTotalOrders] =useState(0);

  useEffect(()=>{
    getStoreDetails();
  },[])






  const getStoreDetails = async () => {
    try {
      const response = await api.get(`/api/stores/owner-details/`);
      setStoreData(response.data);
      setTodayOrders(response.data.today_orders);
      setMonthlyOrders(response.data.monthly_orders);
      setWeeklyOrders(response.data.weekly_orders);
      setTotalOrders(response.data.total_orders);
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
//   const [storeData] = useState({
//     store_details: {
//       id: "3f95339a-c5d5-477e-b19e-8baeab2ab230",
//       name: "Pizza Bites",
//       email: null,
//       phone: null,
//       storeid: "STR402765",
//       store_type: "restaurant",
//       category: "Restaurant",
//       streetnumber: null,
//       streetname: null,
//       city: null,
//       province: null,
//       imageurl: "https://idealmart.s3.ca-central-1.amazonaws.com/development/stores/pizza-bites.jpg",
//       mapurl: null,
//       latitude: "43.6837667",
//       longitude: "-79.8121075",
//       opening_time: "16:00:00",
//       closing_time: "00:00:00",
//       owner: "6b18c10e-2525-42e8-b8e1-dc4ed622b746"
//     },
//     total_orders: 64,
//     monthly_orders: 0,
//     today_orders: 0,
//     weekly_orders: 0
//   });

  const formatTime = (time) => {
    if (!time) return 'N/A';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const isOpen = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = storeData.store_details.opening_time.split(':').map(Number);
    const [closeHour, closeMin] = storeData.store_details.closing_time.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime <= closeTime;
    }
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const orderStats = [
    { 
      label: 'Today', 
      value: today_orders || 0, 
      icon: Calendar, 
      gradient: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
      color: '#3b82f6',
      url:'/storedash'
    },
    { 
      label: 'This Week', 
      value: weekly_orders || 0, 
      icon: TrendingUp, 
      gradient: 'linear-gradient(to bottom right, #a855f7, #9333ea)',
      color: '#a855f7',
      url:'/storedash'
    },
    { 
      label: 'This Month', 
      value: monthly_orders || 0, 
      icon: ShoppingBag, 
      gradient: 'linear-gradient(to bottom right, #22c55e, #16a34a)',
      color: '#22c55e',
      url:'/storedash'
    },
    { 
      label: 'Total Orders', 
      value: total_orders, 
      icon: Store, 
      gradient: 'linear-gradient(to bottom right, #f97316, #ea580c)',
      color: '#f97316',
      url:'/storedash'
    },
    {
        label:"Orders Dashboard",
        value:"Click to See!",
        icon:ShoppingBag,
        gradient:'linear-gradient(to bottom right, #f43f5e, #e11d48)',
        color:"#f43f5e",
        url:'/orderdash'
    },
    {
        label:"Store Analytics",
        value:"Click to see!",
        icon:GitGraphIcon,
        gradient:'linear-gradient(to bottom right, #10b981, #059669)',
        color:"#10b981",
        url:'/analyticsdash'
    }
  ];

  const handleClickIcon = (url) =>{
     navigate(url);

  }

  return (
    <>
    <Navbar/>
    
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.headerCard}>
          <div style={styles.headerBanner}>
            <div style={styles.headerOverlay}></div>
            <div style={styles.headerContent}>
              <div style={styles.headerFlex}>
                <img 
                  src={storeData.store_details.imageurl} 
                  alt={storeData.store_details.name}
                  style={styles.storeImage}
                />
                <div style={styles.headerInfo}>
                  <h1 style={styles.storeName}>{storeData.store_details.name}</h1>
                  <div style={styles.badgeContainer}>
                    <span style={styles.badge}>
                      {storeData.store_details.category}
                    </span>
                    <span style={styles.badge}>
                      ID: {storeData.store_details.storeid}
                    </span>
                    <span style={{
                      ...styles.statusBadge,
                      ...(isOpen() ? styles.statusOpen : styles.statusClosed)
                    }}>
                      {isOpen() ? '● Open' : '● Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Statistics */}
        <div style={styles.statsGrid}>
          {orderStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                title={`Click to see ${stat.label} orders!`}
                style={{
                  ...styles.statCard,
                  ...(hoveredCard === `stat-${index}` ? styles.statCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={()=> handleClickIcon(stat.url)}
              >
                <div style={{...styles.statBorder, background: stat.gradient}}></div>
                <div style={styles.statContent}>
                  <div style={styles.statFlex}>
                    <div>
                      <p style={styles.statLabel}>{stat.label}</p>
                      <p style={styles.statValue}>{stat.value}</p>
                    </div>
                    <div style={{...styles.statIcon, background: stat.gradient}}>
                      <Icon style={{width: '28px', height: '28px', color: 'white'}} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Store Details */}
        <div style={styles.detailsGrid}>
          {/* Operating Hours */}
          <div 
            style={{
              ...styles.detailCard,
              ...(hoveredCard === 'hours' ? styles.detailCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('hours')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.detailHeader}>
              <div style={{
                ...styles.detailIconBox, 
                background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)'
              }}>
                <Clock style={{width: '20px', height: '20px', color: 'white'}} />
              </div>
              <h3 style={styles.detailTitle}>Operating Hours</h3>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Opens</span>
              <span style={styles.detailValue}>{formatTime(storeData.store_details.opening_time)}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Closes</span>
              <span style={styles.detailValue}>{formatTime(storeData.store_details.closing_time)}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div 
            style={{
              ...styles.detailCard,
              ...(hoveredCard === 'contact' ? styles.detailCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('contact')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.detailHeader}>
              <div style={{
                ...styles.detailIconBox, 
                background: 'linear-gradient(to bottom right, #22c55e, #16a34a)'
              }}>
                <Mail style={{width: '20px', height: '20px', color: 'white'}} />
              </div>
              <h3 style={styles.detailTitle}>Contact Info</h3>
            </div>
            <div style={styles.contactItem}>
              <Mail style={{width: '20px', height: '20px', color: '#9ca3af'}} />
              <span style={styles.contactText}>
                {storeData.store_details.email || 'Not provided'}
              </span>
            </div>
            <div style={styles.contactItem}>
              <Phone style={{width: '20px', height: '20px', color: '#9ca3af'}} />
              <span style={styles.contactText}>
                {storeData.store_details.phone || 'Not provided'}
              </span>
            </div>
          </div>

          {/* Location */}
          <div 
            style={{
              ...styles.detailCard,
              ...(hoveredCard === 'location' ? styles.detailCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard('location')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.detailHeader}>
              <div style={{
                ...styles.detailIconBox, 
                background: 'linear-gradient(to bottom right, #a855f7, #9333ea)'
              }}>
                <MapPin style={{width: '20px', height: '20px', color: 'white'}} />
              </div>
              <h3 style={styles.detailTitle}>Location</h3>
            </div>
            <div style={styles.locationCoords}>
              <p style={styles.coordLabel}>Coordinates</p>
              <p style={styles.coordValue}>
                {storeData.store_details.latitude}, {storeData.store_details.longitude}
              </p>
            </div>
            <a 
              href={`https://www.google.com/maps?q=${storeData.store_details.latitude},${storeData.store_details.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mapButton}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #9333ea, #7c3aed)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #a855f7, #9333ea)';
              }}
            >
              View on Map
            </a>
          </div>
        </div>

        {/* Store Type & Category */}
        <div style={styles.classificationCard}>
          <h3 style={styles.classificationTitle}>Store Classification</h3>
          <div style={styles.classificationGrid}>
            <div style={{...styles.classificationItem, ...styles.typeItem}}>
              <p style={{...styles.classificationLabel, ...styles.typeLabel}}>Store Type</p>
              <p style={{...styles.classificationValue, ...styles.typeValue}}>
                {storeData.store_details.store_type}
              </p>
            </div>
            <div style={{...styles.classificationItem, ...styles.categoryItem}}>
              <p style={{...styles.classificationLabel, ...styles.categoryLabel}}>Category</p>
              <p style={{...styles.classificationValue, ...styles.categoryValue}}>
                {storeData.store_details.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}