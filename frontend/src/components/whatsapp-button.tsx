'use client';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { whatsappLink } from '@/lib/utils';
export function WhatsAppButton() {
  return (
    <motion.a href={whatsappLink()} target="_blank" rel="noopener" aria-label="WhatsApp"
      initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl shadow-green-500/40 transition-colors">
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
    </motion.a>
  );
}