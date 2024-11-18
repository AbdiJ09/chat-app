import { motion } from "framer-motion";
import { ChatroomList } from "./components/ChatRoomList";
import { ChatroomDetail } from "./components/ChatRoomDetail";
import { useChatroomEffects } from "@/hooks/useChatroomEffects";
import { ChatroomListMobile } from "@/components/ChatroomListMobile";
import { useChatroom } from "@/hooks/useChatroom";
import { useUIStore } from "@/store/ui.store";

const ChatroomPage = () => {
  useChatroomEffects();
  const { hasJoinedRoom } = useChatroom();
  const { isMobile } = useUIStore();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-foreground via-purple-900 to-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex w-full h-full overflow-hidden border shadow-lg border-zinc-600 md:h-4/5 md:max-w-5xl md:rounded-xl"
      >
        {/* chatroom list desktop */}
        <ChatroomList />
        <ChatroomDetail />

        {/* chatroom list mobile */}
        {isMobile && !hasJoinedRoom && <ChatroomListMobile />}
      </motion.div>
    </div>
  );
};

export default ChatroomPage;
