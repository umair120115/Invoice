import React, { useState } from 'react';
import { ChefHat, Star, Clock, MapPin, Phone, ArrowLeft, ShoppingCart } from 'lucide-react';

const RestaurantMenuUI = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const restaurants = [
    {
      id: 1,
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "30-40 min",
      image: "🍝",
      description: "Authentic Italian cuisine with fresh ingredients",
      phone: "+1 234-567-8900",
      address: "123 Main Street, Downtown",
      menu: [
        { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza" },
        { id: 2, name: "Spaghetti Carbonara", price: 14.99, category: "Pasta" },
        { id: 3, name: "Lasagna", price: 15.99, category: "Pasta" },
        { id: 4, name: "Tiramisu", price: 6.99, category: "Dessert" }
      ]
    },
    {
      id: 2,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      image: "🍛",
      description: "Traditional Indian flavors and spices",
      phone: "+1 234-567-8901",
      address: "456 Oak Avenue, City Center",
      menu: [
        { id: 1, name: "Butter Chicken", price: 13.99, category: "Main Course" },
        { id: 2, name: "Biryani", price: 12.99, category: "Rice" },
        { id: 3, name: "Paneer Tikka", price: 11.99, category: "Appetizer" },
        { id: 4, name: "Naan Bread", price: 2.99, category: "Bread" }
      ]
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "35-45 min",
      image: "🍣",
      description: "Fresh sushi and Japanese delicacies",
      phone: "+1 234-567-8902",
      address: "789 Pine Road, Eastside",
      menu: [
        { id: 1, name: "California Roll", price: 9.99, category: "Rolls" },
        { id: 2, name: "Salmon Sashimi", price: 16.99, category: "Sashimi" },
        { id: 3, name: "Tempura Set", price: 14.99, category: "Tempura" },
        { id: 4, name: "Miso Soup", price: 3.99, category: "Soup" }
      ]
    },
    {
      id: 4,
      name: "Burger House",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "🍔",
      description: "Juicy burgers and classic American food",
      phone: "+1 234-567-8903",
      address: "321 Elm Street, Westside",
      menu: [
        { id: 1, name: "Classic Burger", price: 10.99, category: "Burgers" },
        { id: 2, name: "Cheese Fries", price: 5.99, category: "Sides" },
        { id: 3, name: "Chicken Wings", price: 11.99, category: "Appetizer" },
        { id: 4, name: "Milkshake", price: 4.99, category: "Drinks" }
      ]
    },
    {
      id: 5,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "30-40 min",
      image: "🥡",
      description: "Authentic Chinese dishes and dim sum",
      phone: "+1 234-567-8904",
      address: "654 Maple Drive, Northside",
      menu: [
        { id: 1, name: "Kung Pao Chicken", price: 13.99, category: "Main Course" },
        { id: 2, name: "Fried Rice", price: 8.99, category: "Rice" },
        { id: 3, name: "Spring Rolls", price: 6.99, category: "Appetizer" },
        { id: 4, name: "Dim Sum Platter", price: 15.99, category: "Dim Sum" }
      ]
    },
    {
      id: 6,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.4,
      deliveryTime: "25-35 min",
      image: "🌮",
      description: "Vibrant Mexican flavors and fresh ingredients",
      phone: "+1 234-567-8905",
      address: "987 Cedar Lane, Southside",
      menu: [
        { id: 1, name: "Beef Tacos", price: 9.99, category: "Tacos" },
        { id: 2, name: "Chicken Burrito", price: 11.99, category: "Burritos" },
        { id: 3, name: "Nachos Supreme", price: 8.99, category: "Appetizer" },
        { id: 4, name: "Churros", price: 5.99, category: "Dessert" }
      ]
    }
  ];

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('menu');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedRestaurant(null);
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '20px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#e9ecef',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: '#495057',
      transition: 'background-color 0.2s',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6c757d',
      marginBottom: '40px',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    },
    imageContainer: {
      height: '180px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '80px',
    },
    cardContent: {
      padding: '20px',
    },
    restaurantName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    cuisine: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '12px',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#495057',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    menuContainer: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    restaurantHeader: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    restaurantIcon: {
      fontSize: '60px',
      marginBottom: '15px',
    },
    restaurantTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    restaurantInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '20px',
    },
    infoDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#495057',
      fontSize: '14px',
    },
    menuSection: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    },
    menuTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    menuItem: {
      padding: '16px 0',
      borderBottom: '1px solid #e9ecef',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuItemInfo: {
      flex: 1,
    },
    menuItemName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '4px',
    },
    menuItemCategory: {
      fontSize: '13px',
      color: '#6c757d',
    },
    menuItemPrice: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#28a745',
    },
  };

  if (currentPage === 'menu' && selectedRestaurant) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <button 
              style={styles.backButton}
              onClick={handleBackToHome}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dee2e6'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
            >
              <ArrowLeft size={18} />
              Back to Restaurants
            </button>
          </div>
        </header>
        
        <main style={styles.main}>
          <div style={styles.menuContainer}>
            <div style={styles.restaurantHeader}>
              <div style={styles.restaurantIcon}>{selectedRestaurant.image}</div>
              <h1 style={styles.restaurantTitle}>{selectedRestaurant.name}</h1>
              <p style={styles.cuisine}>{selectedRestaurant.cuisine} • {selectedRestaurant.description}</p>
              
              <div style={styles.restaurantInfo}>
                <div style={styles.infoDetail}>
                  <Star size={18} fill="#ffc107" color="#ffc107" />
                  <span>{selectedRestaurant.rating} Rating</span>
                </div>
                <div style={styles.infoDetail}>
                  <Clock size={18} />
                  <span>{selectedRestaurant.deliveryTime}</span>
                </div>
                <div style={styles.infoDetail}>
                  <MapPin size={18} />
                  <span>{selectedRestaurant.address}</span>
                </div>
                <div style={styles.infoDetail}>
                  <Phone size={18} />
                  <span>{selectedRestaurant.phone}</span>
                </div>
              </div>
            </div>

            <div style={styles.menuSection}>
              <h2 style={styles.menuTitle}>
                <ShoppingCart size={24} />
                Menu
              </h2>
              {selectedRestaurant.menu.map((item, index) => (
                <div 
                  key={item.id} 
                  style={{
                    ...styles.menuItem,
                    borderBottom: index === selectedRestaurant.menu.length - 1 ? 'none' : '1px solid #e9ecef'
                  }}
                >
                  <div style={styles.menuItemInfo}>
                    <div style={styles.menuItemName}>{item.name}</div>
                    <div style={styles.menuItemCategory}>{item.category}</div>
                  </div>
                  <div style={styles.menuItemPrice}>${item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <ChefHat size={32} color="#667eea" />
            <span>FoodHub</span>
          </div>
        </div>
      </header>
      
      <main style={styles.main}>
        <h1 style={styles.title}>Choose Your Restaurant</h1>
        <p style={styles.subtitle}>Discover delicious food from our partner restaurants</p>
        
        <div style={styles.grid}>
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={styles.card}
              onClick={() => handleRestaurantClick(restaurant)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}
            >
              <div style={styles.imageContainer}>
                {restaurant.image}
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.restaurantName}>{restaurant.name}</h3>
                <p style={styles.cuisine}>{restaurant.cuisine}</p>
                <div style={styles.infoRow}>
                  <div style={styles.infoItem}>
                    <Star size={16} fill="#ffc107" color="#ffc107" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Clock size={16} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RestaurantMenuUI;