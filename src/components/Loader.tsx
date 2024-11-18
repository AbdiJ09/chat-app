import { motion } from "framer-motion";

export const Loader = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? { duration: 0 } : { duration: 0.5 },
      }}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className="absolute top-0 z-50 flex items-center justify-center w-full h-full bg-gray-900/50"
    >
      <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
    </motion.div>
  );
};
