import React, { useState } from 'react';
import { X, Tag, Calendar, Package } from 'lucide-react';

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      id: "3156694d-552a-4495-a446-c0aaec73d9c0",
      product_id: "BOGA5-LIGHT-001",
      name: "Heavy Meal",
      category: "Combo",
      price: "8.99",
      discount_price: "8.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Samosa+Chaat.jpg",
      discount_percentage: 0,
      valid_from: "2025-10-29T18:04:09-04:00",
      valid_to: "2025-11-28T17:38:48-05:00",
      product_type: "boga5",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "eed97f80-b4f6-41c6-bb18-2bbe08e71528",
      product_id: "asfdasf",
      name: "Light Meal",
      category: "Meat",
      price: "175.99",
      discount_price: "175.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Aptizer/Samosa+Chaat.jpg",
      discount_percentage: 0,
      valid_from: "2025-10-29T17:38:37-04:00",
      valid_to: "2025-11-28T17:38:48-05:00",
      product_type: "boga5",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "7bc550c5-9d35-44d3-970c-05dae16146aa",
      product_id: "PRD388AE76A",
      name: "Extra Large Shahi Paneer Pizza",
      category: "Combo",
      price: "23.99",
      discount_price: "2.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Pizza+Sub.webp",
      discount_percentage: 87,
      valid_from: "2025-04-17T00:00:00-04:00",
      valid_to: "2025-12-30T00:00:00-05:00",
      product_type: "combo",
      flyer_product: "no",
      items: 1,
      is_priority: false
    },
    {
      id: "ede5b59a-fdaa-4251-82ba-0722530a6c0c",
      product_id: "PRD08B5A193",
      name: "Large Shahi Paneer Pizza",
      category: "Pizza",
      price: "20.99",
      discount_price: "8.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/large+Shahi+Paneer+Pizza.jpg",
      discount_percentage: 57,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "combo",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "04908a46-5a76-466f-a324-35942ee49e11",
      product_id: "PRDCC03EF90",
      name: "Medium Shahi Paneer Pizza",
      category: "Pizza",
      price: "17.99",
      discount_price: "6.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/medium+Shahi+Paneer+Pizza.jpg",
      discount_percentage: 61,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "combo",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "d3083a93-f84c-4a25-a6bd-e5274fafc8b0",
      product_id: "PRD8B2CE3F6",
      name: "Small Shahi Paneer Pizza",
      category: "Pizza",
      price: "14.99",
      discount_price: "5.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Small+Shahi+Paneer+Pizza.jpg",
      discount_percentage: 60,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "combo",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "e64a5a97-4f16-47d3-aaa0-f6556525d7cd",
      product_id: "PRD6E14EE3A",
      name: "Extra Large Butter Chicken Pizza",
      category: "Pizza",
      price: "23.99",
      discount_price: "10.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Extra+Large+Butter+Chicken+Pizza1.jpg",
      discount_percentage: 54,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "combo",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "04ec7408-b649-4b74-b47a-aa2f9eeeb331",
      product_id: "PRDBEC738CA",
      name: "Large Butter Chicken Pizza",
      category: "Pizza",
      price: "20.99",
      discount_price: "8.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Large+Butter-Chicken-Pizza.jpg",
      discount_percentage: 57,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "combo",
      flyer_product: "yes",
      items: 1,
      is_priority: false
    },
    {
      id: "93f56ca9-f52a-4a97-89b9-3a845d628cbe",
      product_id: "PRDC100E1A7",
      name: "Medium Butter Chicken Pizza",
      category: "Combo",
      price: "17.99",
      discount_price: "6.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Medium+Butter+Chicken+Pizza.jpg",
      discount_percentage: 61,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-12-30T18:00:00-05:00",
      product_type: "service",
      flyer_product: "yes",
      items: 1,
      is_priority: true
    },
    {
      id: "8e83b738-3d0c-484e-9b65-a8fc33540b53",
      product_id: "PRD9BCDFCBB",
      name: "Small Butter chicken Pizza",
      category: "Food",
      price: "14.99",
      discount_price: "5.99",
      image_url: "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/small+butter+chicken+pizza.jpg",
      discount_percentage: 60,
      valid_from: "2025-02-03T06:00:00-05:00",
      valid_to: "2025-10-30T18:00:00-04:00",
      product_type: "service",
      flyer_product: "yes",
      items: 1,
      is_priority: true
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fff7ed, #fed7aa, #fef3c7)',
      padding: '32px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    wrapper: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '18px',
      color: '#6b7280',
    },
    section: {
      marginBottom: '64px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0,
    },
    separator: {
      flex: 1,
      height: '4px',
      background: 'linear-gradient(to right, #fb923c, transparent)',
      borderRadius: '9999px',
    },
    countBadge: {
      backgroundColor: '#f97316',
      color: 'white',
      padding: '6px 16px',
      borderRadius: '9999px',
      fontWeight: '600',
      fontSize: '14px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)',
      transform: 'translateY(-4px)',
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#f3f4f6',
      height: '224px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    imageHover: {
      transform: 'scale(1.1)',
    },
    discountBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontWeight: 'bold',
      fontSize: '14px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
    },
    priorityBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      backgroundColor: '#fbbf24',
      color: '#78350f',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontWeight: 'bold',
      fontSize: '12px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
    },
    cardContent: {
      padding: '20px',
    },
    categoryBadge: {
      display: 'inline-block',
      backgroundColor: '#fed7aa',
      color: '#c2410c',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '9999px',
      marginBottom: '12px',
    },
    productName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '12px',
      minHeight: '56px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
    },
    currentPrice: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#16a34a',
    },
    originalPrice: {
      fontSize: '18px',
      color: '#9ca3af',
      textDecoration: 'line-through',
    },
    regularPrice: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(to right, #f97316, #ef4444)',
      color: 'white',
      fontWeight: '600',
      padding: '12px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    },
    buttonHover: {
      background: 'linear-gradient(to right, #ea580c, #dc2626)',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 9999,
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '24px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    },
    modalHeader: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderRadius: '24px 24px 0 0',
      zIndex: 10,
    },
    modalTitle: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
    },
    closeButton: {
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '8px',
      borderRadius: '9999px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonHover: {
      color: '#1f2937',
      backgroundColor: '#f3f4f6',
    },
    modalBody: {
      padding: '24px',
    },
    modalImage: {
      width: '100%',
      height: '320px',
      objectFit: 'cover',
      borderRadius: '16px',
      marginBottom: '24px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    },
    priceSection: {
      background: 'linear-gradient(to right, #d1fae5, #a7f3d0)',
      padding: '24px',
      borderRadius: '16px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceInfo: {
      flex: 1,
    },
    priceLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px',
    },
    savingsSection: {
      textAlign: 'right',
    },
    savingsAmount: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ef4444',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '16px',
    },
    detailBox: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '12px',
    },
    detailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6b7280',
      marginBottom: '4px',
      fontSize: '14px',
      fontWeight: '500',
    },
    detailValue: {
      color: '#1f2937',
      fontWeight: '600',
      fontSize: '16px',
    },
    validityBox: {
      backgroundColor: '#dbeafe',
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '16px',
    },
    validityHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#1d4ed8',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
    },
    validityGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      fontSize: '14px',
    },
    validityLabel: {
      color: '#2563eb',
      marginBottom: '4px',
    },
    validityValue: {
      color: '#1f2937',
      fontWeight: '600',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '16px',
    },
    statBox: {
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
    },
    statLabel: {
      fontSize: '12px',
      marginBottom: '4px',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    infoBox: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '12px',
    },
    infoTitle: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '8px',
    },
    infoText: {
      fontSize: '14px',
      color: '#4b5563',
      marginBottom: '4px',
    },
    infoLabel: {
      fontWeight: '600',
    },
  };

  const groupedProducts = products.reduce((acc, product) => {
    const type = product.product_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(product);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeLabel = (type) => {
    const labels = {
      'boga5': 'BOGA5 Specials',
      'combo': 'Combo Deals',
      'service': 'Service Items'
    };
    return labels[type] || type.toUpperCase();
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>🍕 Pizza Bites Menu</h1>
          <p style={styles.subtitle}>Discover our delicious selection organized by product type</p>
        </div>

        {Object.entries(groupedProducts).map(([type, typeProducts]) => (
          <div key={type} style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>{getTypeLabel(type)}</h2>
              <div style={styles.separator}></div>
              <span style={styles.countBadge}>{typeProducts.length} items</span>
            </div>

            <div style={styles.grid}>
              {typeProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    ...styles.card,
                    ...(hoveredCard === product.id ? styles.cardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.imageContainer}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        ...styles.image,
                        ...(hoveredCard === product.id ? styles.imageHover : {})
                      }}
                    />
                    {product.discount_percentage > 0 && (
                      <div style={styles.discountBadge}>
                        {product.discount_percentage}% OFF
                      </div>
                    )}
                    {product.is_priority && (
                      <div style={styles.priorityBadge}>
                        ⭐ PRIORITY
                      </div>
                    )}
                  </div>

                  <div style={styles.cardContent}>
                    <span style={styles.categoryBadge}>
                      {product.category || 'Pizza'}
                    </span>
                    
                    <h3 style={styles.productName}>{product.name}</h3>

                    <div style={styles.priceContainer}>
                      {product.discount_percentage > 0 ? (
                        <>
                          <span style={styles.currentPrice}>
                            ${product.discount_price}
                          </span>
                          <span style={styles.originalPrice}>
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span style={styles.regularPrice}>
                          ${product.price}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      style={{
                        ...styles.button,
                        ...(hoveredCard === product.id ? styles.buttonHover : {})
                      }}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={styles.modal} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                <span style={styles.categoryBadge}>
                  {selectedProduct.category || 'Pizza'}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  ...styles.closeButton,
                  ...(hoveredCard === 'close' ? styles.closeButtonHover : {})
                }}
                onMouseEnter={() => setHoveredCard('close')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <X size={28} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={{ position: 'relative' }}>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  style={styles.modalImage}
                />
                {selectedProduct.discount_percentage > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    ...styles.discountBadge,
                    fontSize: '18px',
                    padding: '8px 16px'
                  }}>
                    {selectedProduct.discount_percentage}% OFF
                  </div>
                )}
              </div>

              <div style={styles.priceSection}>
                <div style={styles.priceInfo}>
                  <p style={styles.priceLabel}>Current Price</p>
                  <div style={styles.priceContainer}>
                    <span style={{...styles.currentPrice, fontSize: '36px'}}>
                      ${selectedProduct.discount_price}
                    </span>
                    {selectedProduct.discount_percentage > 0 && (
                      <span style={{...styles.originalPrice, fontSize: '20px'}}>
                        ${selectedProduct.price}
                      </span>
                    )}
                  </div>
                </div>
                {selectedProduct.discount_percentage > 0 && (
                  <div style={styles.savingsSection}>
                    <p style={styles.priceLabel}>You Save</p>
                    <p style={styles.savingsAmount}>
                      ${(parseFloat(selectedProduct.price) - parseFloat(selectedProduct.discount_price)).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              <div style={styles.detailsGrid}>
                <div style={styles.detailBox}>
                  <div style={styles.detailHeader}>
                    <Tag size={18} />
                    <span>Product ID</span>
                  </div>
                  <p style={styles.detailValue}>{selectedProduct.product_id}</p>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailHeader}>
                    <Package size={18} />
                    <span>Product Type</span>
                  </div>
                  <p style={{...styles.detailValue, textTransform: 'capitalize'}}>
                    {selectedProduct.product_type}
                  </p>
                </div>
              </div>

              <div style={styles.validityBox}>
                <div style={styles.validityHeader}>
                  <Calendar size={18} />
                  <span>Validity Period</span>
                </div>
                <div style={styles.validityGrid}>
                  <div>
                    <p style={styles.validityLabel}>Valid From</p>
                    <p style={styles.validityValue}>{formatDate(selectedProduct.valid_from)}</p>
                  </div>
                  <div>
                    <p style={styles.validityLabel}>Valid To</p>
                    <p style={styles.validityValue}>{formatDate(selectedProduct.valid_to)}</p>
                  </div>
                </div>
              </div>

              <div style={styles.statsGrid}>
                <div style={{...styles.statBox, backgroundColor: '#f3e8ff'}}>
                  <p style={{...styles.statLabel, color: '#7c3aed'}}>Items</p>
                  <p style={{...styles.statValue, color: '#6d28d9'}}>{selectedProduct.items}</p>
                </div>

                <div style={{...styles.statBox, backgroundColor: '#fef3c7'}}>
                  <p style={{...styles.statLabel, color: '#d97706'}}>Flyer Product</p>
                  <p style={{...styles.statValue, color: '#b45309', textTransform: 'uppercase'}}>
                    {selectedProduct.flyer_product}
                  </p>
                </div>

                <div style={{...styles.statBox, backgroundColor: '#fce7f3'}}>
                  <p style={{...styles.statLabel, color: '#db2777'}}>Priority</p>
                  <p style={{...styles.statValue, color: '#be185d'}}>
                    {selectedProduct.is_priority ? '⭐' : '—'}
                  </p>
                </div>
              </div>

              <div style={styles.infoBox}>
                <p style={styles.infoTitle}>Internal Information</p>
                <p style={styles.infoText}>
                  <span style={styles.infoLabel}>ID:</span> {selectedProduct.id}
                </p>
                {selectedProduct.subcategory && (
                  <p style={styles.infoText}>
                    <span style={styles.infoLabel}>Subcategory ID:</span> {selectedProduct.subcategory}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  ...styles.button,
                  marginTop: '16px',
                  background: 'linear-gradient(to right, #4b5563, #374151)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #374151, #1f2937)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #4b5563, #374151)';
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;