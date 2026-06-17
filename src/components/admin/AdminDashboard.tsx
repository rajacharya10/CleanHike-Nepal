import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, DollarSign, Calendar, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getAdminStats } from '../../services/admin';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalDonations: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/messages',
    },
    {
      title: 'Total Donations',
      value: `$${stats.totalDonations.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-green-600',
      link: '/admin/donations',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/bookings',
    },
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/messages',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.link}>
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Mail className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New message received</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Donation of $150 received</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New trek booking</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/messages"
              className="block p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
            >
              <p className="font-medium text-emerald-700 dark:text-emerald-400">View Messages</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-500">{stats.unreadMessages} unread</p>
            </Link>
            <Link
              to="/admin/donations"
              className="block p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <p className="font-medium text-blue-700 dark:text-blue-400">Manage Donations</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">View all transactions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
