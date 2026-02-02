import { motion } from "framer-motion";

// ============= MOON =============
export function Moon() {
  return (
    <motion.div
      className="absolute opacity-0 dark:opacity-100 transition-opacity duration-700"
      style={{ right: "12%", top: "8%" }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-foreground/8 blur-2xl" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground/95 via-foreground/75 to-foreground/55 shadow-[0_0_50px_15px_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="absolute w-4 h-4 rounded-full bg-foreground/30 top-2 left-4" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-foreground/25 top-6 left-9" />
          <div className="absolute w-5 h-5 rounded-full bg-foreground/20 top-8 left-2" />
        </div>
      </div>
    </motion.div>
  );
}
