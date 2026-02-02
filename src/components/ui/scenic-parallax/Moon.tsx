import { motion } from "framer-motion";

// ============= MOON WITH MOONLIGHT =============
export function Moon() {
  return (
    <motion.div
      className="absolute opacity-0 dark:opacity-100 transition-opacity duration-700"
      style={{ right: "15%", top: "18%" }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Moonlight glow - large ambient light */}
        <div className="absolute -inset-32 rounded-full bg-[hsl(210,30%,80%)]/10 blur-3xl" />
        <div className="absolute -inset-20 rounded-full bg-[hsl(45,20%,90%)]/15 blur-2xl" />
        
        {/* Moon rays */}
        <svg 
          className="absolute -inset-24 w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          viewBox="0 0 200 200"
        >
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <motion.line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos((angle * Math.PI) / 180) * 90}
              y2={100 + Math.sin((angle * Math.PI) / 180) * 90}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              animate={{ 
                opacity: [0.03, 0.1, 0.03],
                strokeWidth: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
        
        {/* Inner glow */}
        <div className="absolute -inset-8 rounded-full bg-foreground/10 blur-xl" />
        
        {/* Moon body */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(45,15%,95%)] via-[hsl(45,10%,85%)] to-[hsl(45,8%,70%)] shadow-[0_0_60px_20px_rgba(255,255,255,0.2)] relative overflow-hidden">
          {/* Craters */}
          <div className="absolute w-5 h-5 rounded-full bg-foreground/15 top-2 left-5" />
          <div className="absolute w-3 h-3 rounded-full bg-foreground/12 top-7 left-12" />
          <div className="absolute w-6 h-6 rounded-full bg-foreground/10 top-10 left-2" />
          <div className="absolute w-2 h-2 rounded-full bg-foreground/8 top-4 left-14" />
        </div>
      </div>
    </motion.div>
  );
}

// ============= MOONLIGHT OVERLAY (for scene lighting) =============
export function MoonlightOverlay() {
  return (
    <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 pointer-events-none">
      {/* Gradient from moon position casting light downward */}
      <div 
        className="absolute top-0 right-0 w-[60%] h-[80%]"
        style={{
          background: "radial-gradient(ellipse at 70% 25%, rgba(180,200,220,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Subtle blue-ish ambient light on the scene */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(150,170,200,0.03) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
