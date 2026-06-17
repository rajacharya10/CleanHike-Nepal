import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Heart, CheckCircle, Send, Loader2 } from 'lucide-react';
import { PaymentMethod } from '../../config/paymentMethods';

interface DonationSuccessFormProps {
  paymentMethod: PaymentMethod;
  isOpen: boolean;
  onClose: () => void;
}

export function DonationSuccessForm({ paymentMethod, isOpen, onClose }: DonationSuccessFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/record-donation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name || null,
            email: formData.email || null,
            amount: parseFloat(formData.amount) || 0,
            paymentMethod: paymentMethod.id,
            message: formData.message || null,
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to record donation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {!submitted ? (
            <>
              {/* Header */}
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8" />
                    <div>
                      <h3 className="text-xl font-bold">Thank You!</h3>
                      <p className="text-white/80 text-sm">Confirm your donation</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  You sent via {paymentMethod.name}. Help us track your donation by providing details below.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Anonymous"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Donation Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="1000"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Supporting nature conservation..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.amount}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Donation
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success Screen */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Donation Recorded!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for supporting nature conservation. Your contribution helps protect Nepal's beautiful trails.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
