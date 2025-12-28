import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaBars,
  FaPlus
} from 'react-icons/fa'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('https://farmer-backend-5e7s.onrender.com/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setStats(res.data.stats)
        setRecentUsers(res.data.recentUsers)
        setRecentProducts(res.data.recentProducts)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      {/* Sidebar (fixed left) */}
      <div
        className={`fixed left-0 top-[40px] h-[calc(100vh-40px)] w-64 z-40 overflow-y-auto transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <AdminSidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 w-full md:ml-64 p-4 md:p-8`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 md:hidden rounded-lg bg-gray-600 text-white"
          >
            <FaBars />
          </button>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Users</p>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <FaUsers />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-800">
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Products</p>
              <span className="p-2 rounded-lg bg-lime-50 text-lime-600">
                <FaBox />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-800">
              {stats.totalProducts.toLocaleString()}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Orders</p>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <FaShoppingCart />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-800">
              {stats.totalOrders.toLocaleString()}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Revenue</p>
              <span className="p-2 rounded-lg bg-lime-50 text-lime-600">
                <FaDollarSign />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-800">
              ${stats.revenue.toLocaleString()}
            </p>
          </div>
        </section>

        {/* Two Columns: Recent + Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Latest Users</h2>
                <Link
                  to="/user-controller"
                  className="text-emerald-700 hover:underline text-sm"
                >
                  View all
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {recentUsers.length === 0 ? <p className="text-gray-400 py-4 text-sm">No users found.</p> : recentUsers.map((u) => (
                  <div
                    key={u._id}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 capitalize">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Latest Products</h2>
                <Link
                  to="/product-detail"
                  className="text-emerald-700 hover:underline text-sm"
                >
                  Manage
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {recentProducts.length === 0 ? <p className="text-gray-400 py-4 text-sm">No products found.</p> : recentProducts.map((p) => (
                  <div
                    key={p._id}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-800">${p.price}</span>
                      <Link
                        to="/product-detail"
                        className="text-sm text-emerald-700 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
