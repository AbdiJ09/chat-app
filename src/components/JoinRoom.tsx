import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
const JoinRoom = ({ roomName, handleJoinRoom, containerVariants }: { roomName: string | undefined; handleJoinRoom: () => void; containerVariants: Variants }) => (
  <motion.div
    key="join"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="flex flex-col items-center justify-center h-full p-4 bg-gray-900/50"
  >
    <img
      src="/Work chat-bro.svg"
      alt="Join Room"
      className="w-40 h-40 mx-auto mb-4 md:w-60 md:h-60"
    />
    <h1 className="mb-4 text-xl font-bold text-white md:text-2xl">{roomName}</h1>
    <p className="mb-6 text-center text-white/80">Join this room to start chatting and see the content.</p>
    <Button
      onClick={handleJoinRoom}
      className="text-white bg-primary hover:bg-primary/90"
    >
      Join Room
    </Button>
  </motion.div>
);

export default JoinRoom;
