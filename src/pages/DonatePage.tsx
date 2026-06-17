import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Smartphone, Building, Check } from 'lucide-react';
import { donationsData } from '../data/donations';
import { DonationCard } from '../components/cards/DonationCard';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/common/ContainerScroll';

const donationAmounts = [25, 50, 100, 250, 500, 1000];

export function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, available: true },
    { id: 'esewa', name: 'eSewa', icon: Smartphone, available: true },
    { id: 'khalti', name: 'Khalti', icon: Smartphone, available: true },
    { id: 'ime', name: 'IME Pay', icon: Smartphone, available: true },
    { id: 'bank', name: 'Bank Transfer', icon: Building, available: true },
    { id: 'qr', name: 'QR Code', icon: Smartphone, available: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="relative h-64 flex items-center justify-center mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Conservation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-red-900/70 to-gray-900/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-sm mb-6"
          >
            <Heart className="w-4 h-4" />
            Make an Impact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Support Nepal's Environment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Your donation directly funds conservation, community development, and sustainable tourism
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Donate */}
        <ScrollReveal>
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Quick Donation
            </h2>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`relative p-4 rounded-xl transition-all ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:border-emerald-500'
                  }`}
                >
                  {selectedAmount === amount && (
                    <Check className="absolute top-2 right-2 w-4 h-4" />
                  )}
                  <span className="text-lg font-bold">${amount}</span>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Or enter a custom amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    disabled={!method.available}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      !method.available
                        ? 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-gray-700 hover:border-emerald-500 border-2 border-transparent'
                    }`}
                  >
                    <method.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Donate Button */}
            <Button size="lg" className="w-full">
              <Heart className="w-5 h-5 mr-2" />
              Donate ${selectedAmount || customAmount || '0'}
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              100% of your donation goes to environmental and community projects
            </p>
          </div>
        </ScrollReveal>

        {/* Active Campaigns */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Active Campaigns
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose a specific project to support and track its progress
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {donationsData.map((donation, index) => (
            <DonationCard key={donation.id} donation={donation} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
