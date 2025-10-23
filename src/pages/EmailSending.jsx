import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Search, Users, CheckSquare, Square, Send, Filter, X, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import api from '../api';

const EmailSenderApp = () => {
  const [users, setUsers] = useState([]);
  const [allSelectedUsers, setAllSelectedUsers] = useState(new Map());
  const [postalCode, setPostalCode] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [selectAllPages, setSelectAllPages] = useState(false);
  const [apiUrl] = useState('https://api-dev.idealmart.ca/'); // Replace with your actual API URL

  const pageSize = 100; // Matching your max_page_size

  // Fetch users from API
  const fetchUsers = useCallback(async (page = 1, pcode = '') => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        postal_code: pcode//pageSize.toString(),
      });

    //   Add postal code filter if provided
      if (pcode.trim()) {
        params.append('postal_code', pcode.trim());
      }

      const response = await api.get(`/api/admincontrol/users/?${params.toString()}`, {
        // headers: {
        //   'Authorization': `Token ${localStorage.getItem('token')}`, // Adjust based on your auth
        //   'Content-Type': 'application/json',
        // },
        
      });

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch users');
    //   }

    //   const data = await response.json();
    console.log(response.data)
      
      setUsers(response.data.results);
      setTotalCount(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      
      // If "Select All Pages" is active, add current page users
      if (selectAllPages) {
        const newMap = new Map(allSelectedUsers);
        response.data.results.forEach((user, idx) => {
          const uniqueKey = `${user.email || user.phone}_${user.name}_${user.pcode}`;
          newMap.set(uniqueKey, user);
        });
        setAllSelectedUsers(newMap);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please check your API URL and authentication.');
    }
    setLoading(false);
  }, [apiUrl, pageSize, selectAllPages, allSelectedUsers]);

  useEffect(() => {
    fetchUsers(currentPage, postalCode);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    setAllSelectedUsers(new Map());
    setSelectAllPages(false);
    fetchUsers(1, postalCode);
  };

  const handleClearFilter = () => {
    setPostalCode('');
    setCurrentPage(1);
    setAllSelectedUsers(new Map());
    setSelectAllPages(false);
    fetchUsers(1, '');
  };

  const getUserKey = (user) => {
    return `${user.email || user.phone}_${user.name}_${user.pcode}`;
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
      // Deselect all on current page
      users.forEach(user => {
        newMap.delete(getUserKey(user));
      });
    } else {
      // Select all on current page
      users.forEach(user => {
        newMap.set(getUserKey(user), user);
      });
    }
    
    setAllSelectedUsers(newMap);
  };

  const handleSelectAllPages = async () => {
    if (selectAllPages) {
      // Deselect all
      setAllSelectedUsers(new Map());
      setSelectAllPages(false);
      return;
    }

    // Confirm action for large datasets
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
      // Fetch all pages
      for (page = 1; page <= maxPages; page++) {
        const params = new URLSearchParams({
          page: page.toString(),
          page_size: pageSize.toString(),
        });

        if (postalCode.trim()) {
          params.append('postal_code', postalCode.trim());
        }

        const response = await api.get(`/api/admincontrol/users/?${params.toString()}`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json',
        //   },
        });

        // const data = await response.json();
        response.data.results.forEach(user => {
          newMap.set(getUserKey(user), user);
        });

        // Small delay to avoid overwhelming the server
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

  const handleSendEmail = async () => {
    const selectedData = Array.from(allSelectedUsers.values());
    const validRecipients = selectedData.filter(u => u.email);
    
    if (validRecipients.length === 0) {
      alert('No users with valid email addresses selected!');
      return;
    }

    if (!subject.trim() || !message.trim()) {
      alert('Please fill in subject and message!');
      return;
    }

    console.log('Sending email to:', validRecipients);
    console.log('Subject:', subject);
    console.log('Message:', message);
    
    // Prepare data for your email API
    const emailData = {
      recipients: validRecipients.map(u => u.email),
      subject: subject,
      message: message,
    };

    alert(`Email will be sent to ${validRecipients.length} recipients!`);
    
    // Add your email sending API call here
    // fetch(`${apiUrl}/api/send-email/`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData),
    // });
    const response = await api.post(`/api/admincontrol/send-email/`, emailData)
    alert(response.data.message)
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPageUsersSelected = users.filter(user => isUserSelected(user)).length;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Mail size={32} color="#fff" />
          <h1 style={styles.title}>iDealMart Email Sending View</h1>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Left Panel - Users List */}
        <div style={styles.leftPanel}>
          <div style={styles.filterSection}>
            <div style={styles.filterHeader}>
              <Filter size={20} />
              <h2 style={styles.sectionTitle}>Filter Users</h2>
            </div>
            
            <div style={styles.searchBar}>
              <input
                type="text"
                placeholder="Enter Postal Code (e.g., L6P)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={styles.searchInput}
                maxLength={7}
              />
              {postalCode && (
                <button onClick={handleClearFilter} style={styles.clearBtn}>
                  <X size={18} />
                </button>
              )}
              <button onClick={handleSearch} style={styles.searchBtn}>
                <Search size={20} />
                Search
              </button>
            </div>

            <div style={styles.filterInfo}>
              {postalCode && (
                <div style={styles.activeFilter}>
                  Filtering by: <strong>{postalCode}</strong>
                </div>
              )}
              <div style={styles.totalCount}>
                Total Users: <strong>{totalCount}</strong>
              </div>
            </div>
          </div>

          <div style={styles.usersSection}>
            <div style={styles.userHeader}>
              <div style={styles.selectAllContainer}>
                <button onClick={toggleSelectCurrentPage} style={styles.selectAllBtn}>
                  {currentPageUsersSelected === users.length && users.length > 0 ? 
                    <CheckSquare size={20} color="#4f46e5" /> : 
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
                  <Loader size={48} color="#4f46e5" style={{ animation: 'spin 1s linear infinite' }} />
                  <p>Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div style={styles.emptyState}>
                  <Users size={48} color="#d1d5db" />
                  <p>No users found</p>
                  {postalCode && <p style={styles.emptyHint}>Try adjusting your postal code filter</p>}
                </div>
              ) : (
                users.map((user, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleUserSelection(user)}
                    style={{
                      ...styles.userCard,
                      ...(isUserSelected(user) ? styles.userCardSelected : {})
                    }}
                  >
                    <div style={styles.checkbox}>
                      {isUserSelected(user) ? 
                        <CheckSquare size={20} color="#4f46e5" /> : 
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
                        <span style={styles.badge}>{user.pcode}</span>
                        {user.phone && <span style={styles.phone}>{user.phone}</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
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

        {/* Right Panel - Email Composer */}
        <div style={styles.rightPanel}>
          <div style={styles.composerHeader}>
            <Mail size={24} />
            <h2 style={styles.sectionTitle}>Compose Message</h2>
          </div>

          <div style={styles.composer}>
            <div style={styles.recipientInfo}>
              <div><strong>Total Selected:</strong> {allSelectedUsers.size} users</div>
              <div><strong>With Email:</strong> {Array.from(allSelectedUsers.values()).filter(u => u.email).length} users</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={styles.subjectInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.messageInput}
                rows={12}
              />
            </div>

            <button 
              onClick={handleSendEmail}
              style={{
                ...styles.sendBtn,
                ...(allSelectedUsers.size === 0 ? styles.sendBtnDisabled : {})
              }}
              disabled={allSelectedUsers.size === 0}
            >
              <Send size={20} />
              Send Email to {allSelectedUsers.size} User{allSelectedUsers.size !== 1 ? 's' : ''}
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  searchBar: {
    display: 'flex',
    gap: '8px',
    position: 'relative',
    marginBottom: '12px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  clearBtn: {
    position: 'absolute',
    right: '110px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    color: '#6b7280',
  },
  searchBtn: {
    padding: '12px 20px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  filterInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#6b7280',
  },
  activeFilter: {
    padding: '6px 12px',
    backgroundColor: '#dbeafe',
    borderRadius: '6px',
    color: '#1e40af',
  },
  totalCount: {
    color: '#4b5563',
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
    backgroundColor: '#ede9fe',
    borderColor: '#4f46e5',
    color: '#4f46e5',
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
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    marginBottom: '8px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
  },
  userCardSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
  },
  checkbox: {
    paddingTop: '2px',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  userDetails: {
    marginBottom: '8px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#4f46e5',
  },
  noEmail: {
    fontSize: '14px',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  userMeta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: '12px',
    padding: '4px 10px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '12px',
    fontWeight: '500',
  },
  phone: {
    fontSize: '12px',
    color: '#6b7280',
  },
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
    backgroundColor: '#4f46e5',
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
    gap: '4px',
  },
  formGroup: {
    marginBottom: '20px',
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
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 32px',
    backgroundColor: '#4f46e5',
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

export default EmailSenderApp;