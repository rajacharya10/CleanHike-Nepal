import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Search, Filter, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { getAllDonations } from '../../services/admin';

export function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await getAllDonations();
      setDonations(data || []);
    } catch (error) {
      console.error('Failed to load donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(d => {
    return !search ||
      d.donor_name?.toLowerCase().includes(search.toLowerCase()) ||
      d.donor_email?.toLowerCase().includes(search.toLowerCase());
  });

  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  const statusIcons = {
    completed: CheckCircle,
    pending: Clock,
    failed: XCircle,
    refunded: XCircle,
  };

  const statusColors = {
    completed: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
    pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
    failed: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    refunded: 'text-gray-600 bg-gray-100 dark:bg-gray-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donations</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Total raised: ${totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{donations.length}</p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Donation</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${donations.length ? Math.round(totalAmount / donations.length).toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by donor name or email..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Donations Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Donor</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Campaign</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Method</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredDonations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No donations found
                </td>
              </tr>
            ) : (
              filteredDonations.map((donation) => {
                const StatusIcon = statusIcons[donation.payment_status as keyof typeof statusIcons];
                return (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {donation.donor_name || 'Anonymous'}
                        </p>
                        {donation.donor_email && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{donation.donor_email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        ${Number(donation.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {donation.donation_campaigns?.title || 'General'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 capitalize">
                      {donation.payment_method}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusColors[donation.payment_status as keyof typeof statusColors]}`}>
                        <StatusIcon className="w-4 h-4" />
                        {donation.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
