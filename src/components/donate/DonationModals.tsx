import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethod, bankTransferDetails } from '../../config/paymentMethods';

interface DonationModalProps {
  paymentMethod: PaymentMethod | null;
  isOpen: boolean;
  onClose: () => void;
  onDonated: () => void;
  showSuccessForm?: boolean;
}

export function DonationModal({ paymentMethod, isOpen, onClose, onDonated }: DonationModalProps) {
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!paymentMethod) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentMethod.walletId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDonated = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    onDonated();
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {!showSuccess ? (
              <>
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${paymentMethod.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{paymentMethod.name}</h3>
                      <p className="text-white/80 text-sm mt-1">Scan to donate</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="p-6">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 mb-6">
                    <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                      {/* Placeholder QR - Replace with actual QR image */}
                      <div className="text-center">
                        <div className="w-40 h-40 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-32 h-32 text-gray-400" viewBox="0 0 100 100">
                            <rect x="10" y="10" width="20" height="20" fill="currentColor" />
                            <rect x="70" y="10" width="20" height="20" fill="currentColor" />
                            <rect x="10" y="70" width="20" height="20" fill="currentColor" />
                            <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                            <rect x="15" y="40" width="10" height="10" fill="currentColor" />
                            <rect x="40" y="15" width="10" height="10" fill="currentColor" />
                            <rect x="75" y="40" width="10" height="10" fill="currentColor" />
                            <rect x="40" y="75" width="10" height="10" fill="currentColor" />
                            <rect x="15" y="55" width="10" height="10" fill="currentColor" />
                            <rect x="55" y="15" width="10" height="10" fill="currentColor" />
                            <rect x="75" y="55" width="10" height="10" fill="currentColor" />
                            <rect x="55" y="75" width="10" height="10" fill="currentColor" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">QR Code: {paymentMethod.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Holder</p>
                        <p className="font-medium text-gray-900 dark:text-white">{paymentMethod.accountHolder}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Wallet ID</p>
                        <p className="font-mono font-medium text-gray-900 dark:text-white">{paymentMethod.walletId}</p>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">How to donate:</p>
                    <ol className="space-y-2">
                      {paymentMethod.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* I Have Donated Button */}
                  <button
                    onClick={handleDonated}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    I Have Donated
                  </button>
                </div>
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
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Thank you for supporting nature conservation. Your contribution helps protect Nepal's beautiful trails for future generations.
                </p>
                <button
                  onClick={handleSuccessClose}
                  className="px-8 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Bank Transfer Modal
interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonated: () => void;
}

export function BankTransferModal({ isOpen, onClose, onDonated }: BankTransferModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const details = [
    { label: 'Bank Name', value: bankTransferDetails.bankName, field: 'bank' },
    { label: 'Account Name', value: bankTransferDetails.accountName, field: 'name' },
    { label: 'Account Number', value: bankTransferDetails.accountNumber, field: 'account' },
    { label: 'Branch', value: bankTransferDetails.branch, field: 'branch' },
    { label: 'SWIFT Code', value: bankTransferDetails.swiftCode, field: 'swift' },
  ];

  if (!isOpen) return null;

  return (
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
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Bank Transfer</h3>
              <p className="text-white/80 text-sm mt-1">Direct bank deposit</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bank Details */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            {details.map((detail) => (
              <div key={detail.field} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{detail.label}</p>
                  <p className="font-mono font-medium text-gray-900 dark:text-white">{detail.value}</p>
                </div>
                <button
                  onClick={() => handleCopy(detail.value, detail.field)}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {copied === detail.field ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Please include "CleanHike Donation" in your transfer reference
          </p>

          <button
            onClick={onDonated}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}