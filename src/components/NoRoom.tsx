import { motion, Variants } from "framer-motion";

export const NoRoom = ({ isMobile, containerVariants }: { isMobile: boolean; containerVariants: Variants }) => {
  return (
    <motion.div
      key="no-room"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-full p-4 bg-gray-900/50"
    >
      <img
        src="/undraw_happy_music_g6wc.svg"
        alt="Chatroom"
        className="w-40 h-40 mx-auto mb-4 md:w-52 md:h-52"
      />
      <h1 className="text-xl font-bold text-white md:text-2xl">No Chatroom Selected</h1>
      <p className="mt-2 text-white/80">{isMobile ? "Tap the menu icon to select a room!" : "Select a chatroom from the left to start chatting!"}</p>
    </motion.div>
  );
};
