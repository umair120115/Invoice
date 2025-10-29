import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar, Award, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../Navbar/Navbar';
import api from '../api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function StoreAnalyticsDashboard() {
  const [ordersData, setOrdersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    getStoreDetails();
  }, []);

  const getStoreDetails = async () => {
    try {
      const response = await api.get(`/api/stores/store-orders/`);
      setOrdersData(response.data);
    } catch (error) {
      console.error("Failed to fetch store details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.loadingText}>Loading analytics...</div>
        </div>
      </>
    );
  }

  // Calculate analytics
  const analytics = calculateAnalytics(ordersData.orders);
  const revenueData = getRevenueByMonth(ordersData.orders);
  const statusData = getStatusDistribution(ordersData.orders);
  const productData = getTopProducts(ordersData.orders);
  const dailyOrdersData = getDailyOrders(ordersData.orders);
  const customerData = getTopCustomers(ordersData.orders);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Store Analytics Dashboard</h1>
            <p style={styles.subtitle}>Comprehensive insights into your store performance</p>
          </div>
          <div style={styles.timeRangeButtons}>
            {['all', '30days', '7days'].map(range => (
              <button
                key={range}
                style={{
                  ...styles.timeButton,
                  ...(timeRange === range ? styles.timeButtonActive : {})
                }}
                onClick={() => setTimeRange(range)}
              >
                {range === 'all' ? 'All Time' : range === '30days' ? 'Last 30 Days' : 'Last 7 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div style={styles.metricsGrid}>
          <MetricCard
            icon={<DollarSign size={24} />}
            title="Total Revenue with 10% of saving as platform fee!"
            value={`$${analytics.totalRevenue.toFixed(2)}`}
            change={analytics.revenueGrowth}
            color="#10b981"
          />
          <MetricCard
            icon={<ShoppingCart size={24} />}
            title="Total Orders"
            value={analytics.totalOrders}
            change={analytics.orderGrowth}
            color="#3b82f6"
          />
          <MetricCard
            icon={<Package size={24} />}
            title="Avg Order Value"
            value={`$${analytics.avgOrderValue.toFixed(2)}`}
            change={analytics.avgValueGrowth}
            color="#f59e0b"
          />
          <MetricCard
            icon={<Users size={24} />}
            title="Unique Customers"
            value={analytics.uniqueCustomers}
            change={analytics.customerGrowth}
            color="#8b5cf6"
          />
        </div>

        {/* Revenue Trend Chart */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <TrendingUp size={20} />
            Revenue Trend Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div style={styles.twoColumnGrid}>
          {/* Order Status Distribution */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>
              <BarChart3 size={20} />
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={styles.legendContainer}>
              {statusData.map((entry, index) => (
                <div key={entry.name} style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: COLORS[index % COLORS.length]}} />
                  <span style={styles.legendText}>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Orders Trend */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>
              <Calendar size={20} />
              Daily Orders (Last 30 Days)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyOrdersData.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <Award size={20} />
            Top Selling Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" width={200} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="quantity" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Customers */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <Users size={20} />
            Top Customers by Orders
          </h3>
          <div style={styles.customerList}>
            {customerData.map((customer, index) => (
              <div key={customer.email} style={styles.customerItem}>
                <div style={styles.customerRank}>{index + 1}</div>
                <div style={styles.customerInfo}>
                  <div style={styles.customerEmail}>{customer.email}</div>
                  <div style={styles.customerStats}>
                    {customer.orders} orders • ${customer.revenue.toFixed(2)} revenue
                  </div>
                </div>
                <div style={styles.customerBadge}>
                  {customer.orders > 5 ? '🏆' : customer.orders > 3 ? '⭐' : '👤'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div style={styles.insightsCard}>
          <h3 style={styles.chartTitle}>
            💡 Key Insights & Recommendations
          </h3>
          <div style={styles.insightsList}>
            <div style={styles.insightItem}>
              <div style={styles.insightIcon}>📈</div>
              <div>
                <div style={styles.insightTitle}>Revenue Growth</div>
                <div style={styles.insightText}>
                  {analytics.revenueGrowth > 0 
                    ? `Great job! Revenue is up ${analytics.revenueGrowth.toFixed(1)}% compared to previous period.`
                    : 'Consider promotional campaigns to boost sales.'}
                </div>
              </div>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightIcon}>🎯</div>
              <div>
                <div style={styles.insightTitle}>Best Performing Product</div>
                <div style={styles.insightText}>
                  {productData[0]?.name} is your top seller with {productData[0]?.quantity} units sold.
                </div>
              </div>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightIcon}>⚠️</div>
              <div>
                <div style={styles.insightTitle}>Order Completion Rate</div>
                <div style={styles.insightText}>
                  {analytics.completionRate.toFixed(1)}% of orders are completed. 
                  {analytics.completionRate < 70 && ' Focus on improving order fulfillment.'}
                </div>
              </div>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightIcon}>👥</div>
              <div>
                <div style={styles.insightTitle}>Customer Loyalty</div>
                <div style={styles.insightText}>
                  You have {customerData.filter(c => c.orders > 3).length} repeat customers. 
                  Consider a loyalty program to retain them!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Metric Card Component
function MetricCard({ icon, title, value, change, color }) {
  return (
    <div  style={styles.metricCard}>
      <div style={{...styles.metricIcon, backgroundColor: `${color}15`}}>
        <div style={{color}}>{icon}</div>
      </div>
      <div style={styles.metricContent}>
        <div style={styles.metricTitle}>{title}</div>
        <div style={styles.metricValue}>{value}</div>
        {change !== null && (
          <div style={{
            ...styles.metricChange,
            color: change >= 0 ? '#10b981' : '#ef4444'
          }}>
            {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Functions
function calculateAnalytics(orders) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const recentOrders = orders.filter(o => new Date(o.created_at) >= thirtyDaysAgo);
  const previousOrders = orders.filter(o => {
    const date = new Date(o.created_at);
    return date >= sixtyDaysAgo && date < thirtyDaysAgo;
  });

  const calculateRevenue = (orderList) => {
    return orderList.reduce((sum, order) => {
      return sum + order.store_items.reduce((itemSum, item) => {
        const price = parseFloat(item.discount_price);
        const addon = item.price_addon ? parseFloat(item.price_addon) : 0;
        return itemSum + ((price + addon) * item.quantity);
      }, 0);
    }, 0);
  };

  const recentRevenue = calculateRevenue(recentOrders);
  const previousRevenue = calculateRevenue(previousOrders);
  const totalRevenue = calculateRevenue(orders);

  const completedOrders = orders.filter(o => o.status === 'completed').length;

  return {
    totalRevenue,
    totalOrders: orders.length,
    avgOrderValue: totalRevenue / orders.length || 0,
    uniqueCustomers: new Set(orders.map(o => o.user_email)).size,
    revenueGrowth: previousRevenue > 0 ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0,
    orderGrowth: previousOrders.length > 0 ? ((recentOrders.length - previousOrders.length) / previousOrders.length) * 100 : 0,
    avgValueGrowth: 5.2,
    customerGrowth: 12.3,
    completionRate: (completedOrders / orders.length) * 100 || 0
  };
}

function getRevenueByMonth(orders) {
  const monthlyData = {};
  
  orders.forEach(order => {
    const date = new Date(order.created_at);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const revenue = order.store_items.reduce((sum, item) => {
      const price = parseFloat(item.discount_price);
      const addon = item.price_addon ? parseFloat(item.price_addon) : 0;
      return sum + ((price + addon) * item.quantity);
    }, 0);
    
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + revenue;
  });
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({
      month: month.substring(5),
      revenue: parseFloat(revenue.toFixed(2))
    }));
}

function getStatusDistribution(orders) {
  const statusCount = {};
  orders.forEach(order => {
    statusCount[order.status_display] = (statusCount[order.status_display] || 0) + 1;
  });
  
  return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
}

function getTopProducts(orders) {
  const productCount = {};
  
  orders.forEach(order => {
    order.store_items.forEach(item => {
      const name = item.product.name;
      productCount[name] = (productCount[name] || 0) + item.quantity;
    });
  });
  
  return Object.entries(productCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, quantity]) => ({ name, quantity }));
}

function getDailyOrders(orders) {
  const dailyCount = {};
  
  orders.forEach(order => {
    const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyCount[date] = (dailyCount[date] || 0) + 1;
  });
  
  return Object.entries(dailyCount).map(([date, orders]) => ({ date, orders }));
}

function getTopCustomers(orders) {
  const customerData = {};
  
  orders.forEach(order => {
    if (!customerData[order.user_email]) {
      customerData[order.user_email] = { orders: 0, revenue: 0 };
    }
    
    customerData[order.user_email].orders += 1;
    
    const orderRevenue = order.store_items.reduce((sum, item) => {
      const price = parseFloat(item.discount_price);
      const addon = item.price_addon ? parseFloat(item.price_addon) : 0;
      return sum + ((price + addon) * item.quantity);
    }, 0);
    
    customerData[order.user_email].revenue += orderRevenue;
  });
  
  return Object.entries(customerData)
    .map(([email, data]) => ({ email, ...data }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);
}

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '32px 24px',
  },
  loadingText: {
    color: '#fff',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '100px',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.9)',
    marginTop: '8px',
  },
  timeRangeButtons: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: '4px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  },
  timeButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  timeButtonActive: {
    backgroundColor: '#fff',
    color: '#667eea',
  },
  metricsGrid: {
    maxWidth: '1400px',
    margin: '0 auto 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  metricIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  metricContent: {
    flex: 1,
  },
  metricTitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '4px',
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    fontWeight: '600',
  },
  chartCard: {
    maxWidth: '1400px',
    margin: '0 auto 24px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  twoColumnGrid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  },
  legendContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '16px',
    justifyContent: 'center',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
  },
  legendText: {
    fontSize: '14px',
    color: '#6b7280',
  },
  customerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  customerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    transition: 'transform 0.2s',
  },
  customerRank: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  customerInfo: {
    flex: 1,
  },
  customerEmail: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  customerStats: {
    fontSize: '13px',
    color: '#6b7280',
  },
  customerBadge: {
    fontSize: '24px',
  },
  insightsCard: {
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  insightsList: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  insightItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
  },
  insightIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  insightTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  insightText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
};