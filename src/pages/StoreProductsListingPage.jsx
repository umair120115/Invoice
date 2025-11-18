import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Edit2, X, Save } from 'lucide-react';
import api from '../api';
import Navbar from '../Navbar/Navbar';
import Footer from '../components/Footer';
const ProductListingPage = () => {
  // Sample data from API
//   const apiData = [
//     {
//         "id": "7bc550c5-9d35-44d3-970c-05dae16146aa",
//         "product_id": "PRD388AE76A",
//         "name": "Extra Large Shahi Paneer Pizza",
//         "category": "Combo",
//         "subcategory": "Pizza",
//         "price": "23.99",
//         "discount_price": "2.99",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Pizza+Sub.webp",
//         "storeName": "Pizza Bites",
//         "discount_percentage": 87,
//         "valid_from": "2025-04-17T00:00:00-04:00",
//         "valid_to": "2025-12-30T00:00:00-05:00",
//         "product_type": "combo",
//         "flyer_product": "no",
//         "is_priority": false
//     },
//     {
//         "id": "04908a46-5a76-466f-a324-35942ee49e11",
//         "product_id": "PRDCC03EF90",
//         "name": "Medium Shahi Paneer Pizza",
//         "price": "17.99",
//         "discount_price": "6.99",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/medium+Shahi+Paneer+Pizza.jpg",
//         "storeName": "Pizza Bites",
//         "discount_percentage": 61,
//         "valid_from": "2025-02-03T06:00:00-05:00",
//         "valid_to": "2025-12-30T18:00:00-05:00",
//         "product_type": "combo",
//         "flyer_product": "yes",
//         "is_priority": false
//     },
//     {
//         "id": "93f56ca9-f52a-4a97-89b9-3a845d628cbe",
//         "product_id": "PRDC100E1A7",
//         "name": "Medium Butter Chicken Pizza",
//         "category": "Combo",
//         "subcategory": "Pizza",
//         "price": "17.99",
//         "discount_price": "6.99",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Medium+Butter+Chicken+Pizza.jpg",
//         "storeName": "Pizza Bites",
//         "discount_percentage": 61,
//         "valid_from": "2025-02-03T06:00:00-05:00",
//         "valid_to": "2025-12-30T18:00:00-05:00",
//         "product_type": "service",
//         "flyer_product": "yes",
//         "is_priority": true
//     },
//     {
//         "id": "d3083a93-f84c-4a25-a6bd-e5274fafc8b0",
//         "product_id": "PRD8B2CE3F6",
//         "name": "Small Shahi Paneer Pizza",
//         "price": "14.99",
//         "discount_price": "5.99",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Pizza+Bite/Small+Shahi+Paneer+Pizza.jpg",
//         "storeName": "Pizza Bites",
//         "discount_percentage": 60,
//         "valid_from": "2025-02-03T06:00:00-05:00",
//         "valid_to": "2025-12-30T18:00:00-05:00",
//         "product_type": "combo",
//         "flyer_product": "yes",
//         "is_priority": false
//     },
//     {
//         "id": "0e47c5f1-921a-43fa-b7e5-494f14ed0e0f",
//         "product_id": "PRD5702B663",
//         "name": "Angoori Rasagulla Pink",
//         "category": "Sweets",
//         "subcategory": "Sweets",
//         "price": "9.62",
//         "discount_price": "4.19",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Sweets/Angoori+Rasagulla+Pink.avif",
//         "storeName": "Brijwasi Foods Ltd",
//         "discount_percentage": 56,
//         "valid_from": "2025-10-10T18:00:00-04:00",
//         "valid_to": "2025-12-30T18:00:00-05:00",
//         "product_type": "service",
//         "flyer_product": "yes",
//         "is_priority": true
//     },
//     {
//         "id": "0367a18f-9d72-4eb5-b215-107c892b4ed0",
//         "product_id": "PRDCE77ABBE",
//         "name": "Mango Lassi",
//         "category": "Drinks",
//         "subcategory": "Lassi, Shakes & More",
//         "price": "5.99",
//         "discount_price": "4.19",
//         "image_url": "https://idealmart.s3.ca-central-1.amazonaws.com/production/Drinks/Mango+Lassi_11zon.jpg",
//         "storeName": "Asian Food Centre Restaurant",
//         "discount_percentage": 30,
//         "valid_from": "2025-08-24T18:00:00-04:00",
//         "valid_to": "2025-12-30T18:00:00-05:00",
//         "product_type": "service",
//         "flyer_product": "yes",
//         "is_priority": true
//     }
//   ];

//   const [products, setProducts] = useState(apiData);
  const [ products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Get unique values for filters
  const stores = useMemo(() => {
    const uniqueStores = [...new Set(products.map(p => p.storeName))];
    return uniqueStores.sort();
  }, [products]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [products]);

  const productTypes = useMemo(() => {
    const uniqueTypes = [...new Set(products.map(p => p.product_type).filter(Boolean))];
    return uniqueTypes.sort();
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.product_id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStore = selectedStore === 'all' || product.storeName === selectedStore;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesType = selectedProductType === 'all' || product.product_type === selectedProductType;
      
      return matchesSearch && matchesStore && matchesCategory && matchesType;
    });
  }, [products, searchTerm, selectedStore, selectedCategory, selectedProductType]);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      discount_price: product.discount_price,
      is_priority: product.is_priority,
      flyer_product: product.flyer_product
    });
  };

  useEffect(
    ()=>{
        getProducts();
    },[]
  )

  const getProducts = async ()=>{
    const response =  await api.get(`/api/products/admin-products/`)
    setProducts(response.data)
  }

  const handleSave = (productId) => {
    // TODO: Call your update API here
    // Example:
    // await updateProduct(productId, editForm);
    
    console.log('Saving product:', productId, editForm);
    
    // Update local state
    setProducts(products.map(p => 
      p.id === productId ? { ...p, ...editForm } : p
    ));
    
    setEditingProduct(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStore('all');
    setSelectedCategory('all');
    setSelectedProductType('all');
  };

  return (
   <>

   <Navbar/>





<div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Product Management</h1>
        <p style={styles.subtitle}>Manage products across all stores</p>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.toolbarContainer}>
        <div style={styles.searchContainer}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <button 
          style={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
          {(selectedStore !== 'all' || selectedCategory !== 'all' || selectedProductType !== 'all') && (
            <span style={styles.filterBadge}>●</span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div style={styles.filterPanel}>
          <div style={styles.filterRow}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Store</label>
              <select 
                value={selectedStore} 
                onChange={(e) => setSelectedStore(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Stores</option>
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Product Type</label>
              <select 
                value={selectedProductType} 
                onChange={(e) => setSelectedProductType(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Types</option>
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <button style={styles.clearButton} onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div style={styles.resultsBar}>
        <span style={styles.resultsText}>
          Showing {filteredProducts.length} of {products.length} products
        </span>
      </div>

      {/* Product Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Product</th>
              <th style={styles.tableHeader}>Store</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Discount Price</th>
              <th style={styles.tableHeader}>Discount %</th>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>Priority</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} style={styles.tableRow}>
                {editingProduct === product.id ? (
                  // Edit Mode
                  <>
                    <td style={styles.tableCell}>
                      <div style={styles.productInfo}>
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          style={styles.productImage}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/60'}
                        />
                        <div>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            style={styles.editInput}
                          />
                          <div style={styles.productId}>{product.product_id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{product.storeName}</td>
                    <td style={styles.tableCell}>
                      {product.category || '-'}
                      {product.subcategory && <div style={styles.subcategory}>{product.subcategory}</div>}
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        style={styles.editInputSmall}
                        step="0.01"
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="number"
                        value={editForm.discount_price}
                        onChange={(e) => setEditForm({...editForm, discount_price: e.target.value})}
                        style={styles.editInputSmall}
                        step="0.01"
                      />
                    </td>
                    <td style={styles.tableCell}>{product.discount_percentage}%</td>
                    <td style={styles.tableCell}>{product.product_type}</td>
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        checked={editForm.is_priority}
                        onChange={(e) => setEditForm({...editForm, is_priority: e.target.checked})}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button 
                          style={styles.saveButton}
                          onClick={() => handleSave(product.id)}
                          title="Save"
                        >
                          <Save size={16} />
                        </button>
                        <button 
                          style={styles.cancelButton}
                          onClick={handleCancel}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // View Mode
                  <>
                    <td style={styles.tableCell}>
                      <div style={styles.productInfo}>
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          style={styles.productImage}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/60'}
                        />
                        <div>
                          <div style={styles.productName}>{product.name}</div>
                          <div style={styles.productId}>{product.product_id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{product.storeName}</td>
                    <td style={styles.tableCell}>
                      {product.category || '-'}
                      {product.subcategory && <div style={styles.subcategory}>{product.subcategory}</div>}
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.price}>${parseFloat(product.price).toFixed(2)}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.discountPrice}>${parseFloat(product.discount_price).toFixed(2)}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.discountBadge}>{product.discount_percentage}%</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.typeBadge}>{product.product_type}</span>
                    </td>
                    <td style={styles.tableCell}>
                      {product.is_priority ? (
                        <span style={styles.priorityBadge}>Yes</span>
                      ) : (
                        <span style={styles.noPriorityBadge}>No</span>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.editButton}
                        onClick={() => handleEdit(product)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div style={styles.emptyState}>
            <p>No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
   
    <Footer/>
   
   
   
   
   
   </>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    margin: 0
  },
  toolbarContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    fontSize: '15px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#495057',
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative'
  },
  filterBadge: {
    color: '#0d6efd',
    fontSize: '20px',
    lineHeight: '1'
  },
  filterPanel: {
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px'
  },
  filterRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  filterGroup: {
    flex: 1,
    minWidth: '200px'
  },
  filterLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '8px'
  },
  filterSelect: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    outline: 'none'
  },
  clearButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#dc3545',
    backgroundColor: '#fff',
    border: '1px solid #dc3545',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  resultsBar: {
    padding: '12px 0',
    marginBottom: '16px'
  },
  resultsText: {
    fontSize: '14px',
    color: '#6c757d',
    fontWeight: '500'
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
    overflow: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6'
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    whiteSpace: 'nowrap'
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
    transition: 'background-color 0.2s'
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#212529',
    verticalAlign: 'middle'
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  productImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  productName: {
    fontWeight: '500',
    color: '#212529',
    marginBottom: '4px'
  },
  productId: {
    fontSize: '12px',
    color: '#6c757d'
  },
  subcategory: {
    fontSize: '12px',
    color: '#6c757d',
    marginTop: '2px'
  },
  price: {
    fontWeight: '500',
    color: '#495057'
  },
  discountPrice: {
    fontWeight: '600',
    color: '#28a745'
  },
  discountBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#dc3545',
    borderRadius: '4px'
  },
  typeBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#495057',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    textTransform: 'capitalize'
  },
  priorityBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#ffc107',
    borderRadius: '4px'
  },
  noPriorityBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    borderRadius: '4px'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '8px',
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  saveButton: {
    padding: '8px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  cancelButton: {
    padding: '8px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  editInput: {
    width: '100%',
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    marginBottom: '4px'
  },
  editInputSmall: {
    width: '80px',
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #dee2e6',
    borderRadius: '4px'
  },
  emptyState: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '16px'
  }
};

export default ProductListingPage;