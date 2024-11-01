"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ isInitial = false }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isInitial ? 0.5 : 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#181411]"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
          transition={{ duration: isInitial ? 0.5 : 0.3 }}
          className="w-24 h-24"
        >
          <svg viewBox="0 0 48 48" className="w-full h-full text-[#f2800d]">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: isInitial ? 1.5 : 0.8, ease: "easeInOut" }}
              d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
        {isInitial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#f2800d] font-bold"
          >
            Vikapu Elite Basketball Academy
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 