import React from "react";

import { motion } from "framer-motion";

import style from "./Overlay.module.css";

export default function Overlay({ children, onClick, className }) {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5}}
        className={`${style.overlay} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
  );
}
