import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Search, Users, CheckSquare, Square, Send, Filter, X, ChevronLeft, ChevronRight, Loader, MessageSquare, ShoppingCart, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import api from '../api';

const UpdatedMobileNotificationApp = () => {
  const [users, setUsers] = useState([]);
  const [allSelectedUsers, setAllSelectedUsers] = useState(new Map());
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [selectAllPages, setSelectAllPages] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('incomplete-orders');
  const [apiUrl] = useState('http://127.0.0.1:8000/');

  const pageSize = 180;

  // Define available filters with their API endpoints
  const filterOptions = [
    {
      id: 'incomplete-orders',
      label: 'Incomplete Orders',
      description: 'Users with items in cart and have order summary but order not placed!',
      icon: ShoppingCart,
      apiEndpoint: '/api/admincontrol/user-order-summary/',
      color: '#7c3aed'
    },
    {
      id: 'shopping-session',
      label: 'Items in Cart',
      description: 'Users who have items in their cart!',
      icon: Calendar,//AlertCircle,
      apiEndpoint: '/api/admincontrol/user-shopping-session/',
      color: '#dc2626'
    },
    // {
    //   id: 'new-users',
    //   label: 'New Users',
    //   description: 'Users registered in the last 7 days',
    //   icon: Users,
    //   apiEndpoint: '/api/admincontrol/new-users/',
    //   color: '#059669'
    // },
    // {
    //   id: 'recent-orders',
    //   label: 'Recent Order Users',
    //   description: 'Users who placed orders in last 7 days',
    //   icon: Calendar,
    //   apiEndpoint: '/api/admincontrol/recent-order-users/',
    //   color: '#2563eb'
    // },
    // {
    //   id: 'high-value',
    //   label: 'High Value Customers',
    //   description: 'Users with total orders above ₹10,000',
    //   icon: TrendingUp,
    //   apiEndpoint: '/api/admincontrol/high-value-users/',
    //   color: '#ea580c'
    // },
    // {
    //   id: 'all-users',
    //   label: 'All Users',
    //   description: 'All registered users in the system',
    //   icon: Users,
    //   apiEndpoint: '/api/admincontrol/all-users/',
    //   color: '#4b5563'
    // }
  ];

  const currentFilter = filterOptions.find(f => f.id === selectedFilter);

  // Fetch users based on selected filter
  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
      });

      const endpoint = currentFilter.apiEndpoint;
      
      // Mock API call - replace with actual API implementation
      const response = await api.get(`${endpoint}?${params.toString()}`, {
        // headers: {
        //   'Authorization': `Token ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
      });

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch users');
    //   }

    //   const data = await response.json();
      
      setUsers(response.data.results);
      setTotalCount(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      
      if (selectAllPages) {
        const newMap = new Map(allSelectedUsers);
        data.results.forEach(user => {
          const uniqueKey = user.id;
          newMap.set(uniqueKey, user);
        });
        setAllSelectedUsers(newMap);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please check your API configuration.');
    }
    setLoading(false);
  }, [apiUrl, selectAllPages, allSelectedUsers, currentFilter]);

  useEffect(() => {
    setCurrentPage(1);
    setAllSelectedUsers(new Map());
    setSelectAllPages(false);
  }, [selectedFilter]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, selectedFilter]);

  const getUserKey = (user) => {
    return user.id;
  };

  const isUserSelected = (user) => {
    return allSelectedUsers.has(getUserKey(user));
  };

  const toggleUserSelection = (user) => {
    const newMap = new Map(allSelectedUsers);
    const userKey = getUserKey(user);
    
    if (newMap.has(userKey)) {
      newMap.delete(userKey);
    } else {
      newMap.set(userKey, user);
    }
    setAllSelectedUsers(newMap);
    setSelectAllPages(false);
  };

  const toggleSelectCurrentPage = () => {
    const newMap = new Map(allSelectedUsers);
    const allCurrentSelected = users.every(user => isUserSelected(user));

    if (allCurrentSelected) {
      users.forEach(user => {
        newMap.delete(getUserKey(user));
      });
    } else {
      users.forEach(user => {
        newMap.set(getUserKey(user), user);
      });
    }
    
    setAllSelectedUsers(newMap);
  };

  const handleSelectAllPages = async () => {
    if (selectAllPages) {
      setAllSelectedUsers(new Map());
      setSelectAllPages(false);
      return;
    }

    if (totalCount > 1000) {
      const confirmed = window.confirm(
        `This will select all ${totalCount} users across all pages. This may take a moment. Continue?`
      );
      if (!confirmed) return;
    }

    setLoading(true);
    const newMap = new Map();
    let page = 1;
    const maxPages = Math.ceil(totalCount / pageSize);

    try {
      const endpoint = currentFilter.apiEndpoint;
      
      for (page = 1; page <= maxPages; page++) {
        const params = new URLSearchParams({
          page: page.toString(),
        });

        const response = await api.get(`${endpoint}?${params.toString()}`);

        // const data = await response.json();
        response.data.results.forEach(user => {
          newMap.set(getUserKey(user), user);
        });

        if (page < maxPages) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      setAllSelectedUsers(newMap);
      setSelectAllPages(true);
    } catch (error) {
      console.error('Error fetching all users:', error);
      alert('Failed to select all users. Please try again.');
    }
    setLoading(false);
  };

  const goToNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSendNotification = async () => {
    const selectedData = Array.from(allSelectedUsers.values());
    const userIds = selectedData.map(u => u.id);
    
    if (userIds.length === 0) {
      alert('No users selected!');
      return;
    }

    if (!title.trim() || !message.trim()) {
      alert('Please fill in notification title and message!');
      return;
    }

    console.log('Sending notification to user IDs:', userIds);
    console.log('Title:', title);
    console.log('Message:', message);
    
    const notificationData = {
      user_ids: userIds,
      title: title,
      message: message,
    };

    try {
      setLoading(true);
      const response = await api.post(`/api/admincontrol/send-fcm-notification/`, notificationData
        // method: 'POST',
        // headers: {
        //   'Authorization': `Token ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(notificationData),
      );

    //   const result = await response.json();
    console.log(response.status)
      
      if (response.status===200) {
        alert(response.message || `Notification sent to ${userIds.length} users successfully!`);
        setTitle('');
        setMessage('');
        setAllSelectedUsers(new Map());
        setSelectAllPages(false);
      } else {
        alert(result.error || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPageUsersSelected = users.filter(user => isUserSelected(user)).length;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Bell size={32} color="#fff" />
          <h1 style={styles.title}>iDealMart Mobile Notification Sender</h1>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Left Panel - Users List */}
        <div style={styles.leftPanel}>
          {/* Filter Selection */}
          <div style={styles.filterSection}>
            <div style={styles.filterHeader}>
              <Filter size={20} />
              <h2 style={styles.sectionTitle}>Filter Users</h2>
            </div>
            
            <div style={styles.filterGrid}>
              {filterOptions.map((filter) => {
                const IconComponent = filter.icon;
                const isActive = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    style={{
                      ...styles.filterCard,
                      ...(isActive ? { 
                        ...styles.filterCardActive,
                        borderColor: filter.color,
                        backgroundColor: `${filter.color}15`
                      } : {})
                    }}
                  >
                    <div style={{
                      ...styles.filterIcon,
                      backgroundColor: `${filter.color}20`
                    }}>
                      <IconComponent size={20} color={filter.color} />
                    </div>
                    <div style={styles.filterInfo}>
                      <div style={styles.filterLabel}>{filter.label}</div>
                      <div style={styles.filterDesc}>{filter.description}</div>
                    </div>
                    {isActive && (
                      <CheckSquare size={20} color={filter.color} />
                    )}
                  </button>
                );
              })}
            </div>

            <div style={styles.totalCount}>
              Total Users: <strong>{totalCount}</strong>
            </div>
          </div>

          <div style={styles.usersSection}>
            <div style={styles.userHeader}>
              <div style={styles.selectAllContainer}>
                <button onClick={toggleSelectCurrentPage} style={styles.selectAllBtn}>
                  {currentPageUsersSelected === users.length && users.length > 0 ? 
                    <CheckSquare size={20} color="#7c3aed" /> : 
                    <Square size={20} color="#6b7280" />
                  }
                </button>
                <span style={styles.userCount}>
                  {currentPageUsersSelected} of {users.length} on page
                </span>
              </div>
              
              {totalPages > 1 && (
                <button 
                  onClick={handleSelectAllPages}
                  style={{
                    ...styles.selectAllPagesBtn,
                    ...(selectAllPages ? styles.selectAllPagesBtnActive : {})
                  }}
                  disabled={loading}
                >
                  {selectAllPages ? <CheckSquare size={16} /> : <Square size={16} />}
                  Select All {totalCount} Users
                </button>
              )}
            </div>

            <div style={styles.selectedInfo}>
              <Users size={16} />
              <strong>{allSelectedUsers.size}</strong> users selected across all pages
            </div>

            <div style={styles.usersList}>
              {loading ? (
                <div style={styles.loadingState}>
                  <Loader size={48} color="#7c3aed" style={{ animation: 'spin 1s linear infinite' }} />
                  <p>Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div style={styles.emptyState}>
                  <Users size={48} color="#d1d5db" />
                  <p>No users found</p>
                  <p style={styles.emptyHint}>Try selecting a different filter</p>
                </div>
              ) : (
                users.map((user) => (
                  <div 
                    key={user.id}
                    onClick={() => toggleUserSelection(user)}
                    style={{
                      ...styles.userCard,
                      ...(isUserSelected(user) ? styles.userCardSelected : {})
                    }}
                  >
                    <div style={styles.checkbox}>
                      {isUserSelected(user) ? 
                        <CheckSquare size={20} color="#7c3aed" /> : 
                        <Square size={20} color="#9ca3af" />
                      }
                    </div>
                    <div style={styles.userInfo}>
                      <div style={styles.userName}>{user.name}</div>
                      <div style={styles.userDetails}>
                        {user.email ? (
                          <span style={styles.userEmail}>{user.email}</span>
                        ) : (
                          <span style={styles.noEmail}>No email</span>
                        )}
                      </div>
                      <div style={styles.userMeta}>
                        {user.pcode && <span style={styles.badge}>{user.pcode}</span>}
                        {user.phone && <span style={styles.phone}>{user.phone}</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button 
                  onClick={goToPreviousPage}
                  disabled={!previousPage || loading}
                  style={{
                    ...styles.paginationBtn,
                    ...(!previousPage || loading ? styles.paginationBtnDisabled : {})
                  }}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                
                <div style={styles.pageInfo}>
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </div>

                <button 
                  onClick={goToNextPage}
                  disabled={!nextPage || loading}
                  style={{
                    ...styles.paginationBtn,
                    ...(!nextPage || loading ? styles.paginationBtnDisabled : {})
                  }}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Notification Composer */}
        <div style={styles.rightPanel}>
          <div style={styles.composerHeader}>
            <Bell size={24} />
            <h2 style={styles.sectionTitle}>Compose Notification</h2>
          </div>

          <div style={styles.composer}>
            <div style={styles.recipientInfo}>
              <div><strong>Total Selected:</strong> {allSelectedUsers.size} users</div>
              <div><strong>Filter:</strong> {currentFilter.label}</div>
              <div style={styles.infoNote}>
                <Bell size={14} />
                Notifications will be sent to selected users' mobile devices
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Notification Title</label>
              <input
                type="text"
                placeholder="Enter notification title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.subjectInput}
                maxLength={100}
              />
              <div style={styles.charCount}>{title.length}/100</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Notification Message</label>
              <textarea
                placeholder="Write your notification message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.messageInput}
                rows={10}
                maxLength={500}
              />
              <div style={styles.charCount}>{message.length}/500</div>
            </div>

            <div style={styles.previewBox}>
              <div style={styles.previewLabel}>Preview</div>
              <div style={styles.notificationPreview}>
                <div style={styles.previewIcon}>
                  <Bell size={20} color="#7c3aed" />
                </div>
                <div style={styles.previewContent}>
                  <div style={styles.previewTitle}>
                    {title || 'Notification Title'}
                  </div>
                  <div style={styles.previewMessage}>
                    {message || 'Your notification message will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSendNotification}
              style={{
                ...styles.sendBtn,
                ...(allSelectedUsers.size === 0 || loading ? styles.sendBtnDisabled : {})
              }}
              disabled={allSelectedUsers.size === 0 || loading}
            >
              {loading ? (
                <>
                  <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Notification to {allSelectedUsers.size} User{allSelectedUsers.size !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  leftPanel: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 140px)',
  },
  rightPanel: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 140px)',
  },
  filterSection: {
    padding: '20px',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#fafafa',
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#1f2937',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginBottom: '16px',
  },
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  filterCardActive: {
    borderWidth: '2px',
  },
  filterIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  filterInfo: {
    flex: 1,
    minWidth: 0,
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '2px',
  },
  filterDesc: {
    fontSize: '11px',
    color: '#6b7280',
    lineHeight: '1.3',
  },
  totalCount: {
    fontSize: '14px',
    color: '#4b5563',
    fontWeight: '500',
  },
  usersSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  userHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#fafafa',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  selectAllContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  selectAllBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  userCount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
  },
  selectAllPagesBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: '#f3f4f6',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#4b5563',
  },
  selectAllPagesBtnActive: {
    backgroundColor: '#f3e8ff',
    borderColor: '#7c3aed',
    color: '#7c3aed',
  },
  selectedInfo: {
    padding: '12px 20px',
    backgroundColor: '#f0fdf4',
    borderBottom: '1px solid #bbf7d0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#15803d',
    fontWeight: '500',
  },
  usersList: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    marginBottom: '4px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    backgroundColor: '#fff',
  },

  userCardSelected: {
    borderColor: '#7c3aed',
    backgroundColor: '#faf5ff',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userDetails: {
    marginBottom: '4px',
  },
  userEmail: {
    fontSize: '12px',
    color: '#7c3aed',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  },
  noEmail: {
    fontSize: '12px',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  userMeta: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  badge: {
    fontSize: '11px',
    padding: '2px 8px',
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    borderRadius: '10px',
    fontWeight: '500',
  },
  phone: {
    fontSize: '11px',
    color: '#6b7280',
  },




//   userCard: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: '12px',
//     padding: '16px',
//     marginBottom: '8px',
//     border: '2px solid #e5e7eb',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     transition: 'all 0.2s',
//     backgroundColor: '#fff',
//   },

//   userCardSelected: {
//     borderColor: '#7c3aed',
//     backgroundColor: '#faf5ff',
//   },
//   checkbox: {
//     paddingTop: '2px',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: '4px',
//   },
//   userDetails: {
//     marginBottom: '8px',
//   },
//   userEmail: {
//     fontSize: '14px',
//     color: '#7c3aed',
//   },
//   noEmail: {
//     fontSize: '14px',
//     color: '#9ca3af',
//     fontStyle: 'italic',
//   },
//   userMeta: {
//     display: 'flex',
//     gap: '8px',
//     flexWrap: 'wrap',
//   },
//   badge: {
//     fontSize: '12px',
//     padding: '4px 10px',
//     backgroundColor: '#e0e7ff',
//     color: '#3730a3',
//     borderRadius: '12px',
//     fontWeight: '500',
//   },
//   phone: {
//     fontSize: '12px',
//     color: '#6b7280',
//   },
  loadingState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af',
  },
  emptyHint: {
    fontSize: '14px',
    marginTop: '8px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderTop: '2px solid #e5e7eb',
    backgroundColor: '#fafafa',
  },
  paginationBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  paginationBtnDisabled: {
    backgroundColor: '#d1d5db',
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#4b5563',
  },
  composerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#fafafa',
  },
  composer: {
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  recipientInfo: {
    padding: '12px 16px',
    backgroundColor: '#f0fdf4',
    border: '2px solid #bbf7d0',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#15803d',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#16a34a',
  },
  formGroup: {
    marginBottom: '20px',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  subjectInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  messageInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  charCount: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '4px',
    textAlign: 'right',
  },
  previewBox: {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  previewLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  notificationPreview: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  previewIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#f3e8ff',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  previewMessage: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 32px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: 'auto',
  },
  sendBtnDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
};

export default UpdatedMobileNotificationApp;