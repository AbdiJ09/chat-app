import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/ui.store";
import MobileHeader from "@/components/MobileHeader";
import JoinRoom from "@/components/JoinRoom";
import { NoRoom } from "@/components/NoRoom";
import { HasJoinRoom } from "@/components/HasJoinRoom";
import { Loader } from "@/components/Loader";
import { useChatroom } from "@/hooks/useChatroom/index";

export const ChatroomDetail = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { currentRoom, messages, hasJoinedRoom, joinedLoading, setMessages, handleJoinRoom, setCurrentChatroom, setHasJoinedRoom, handleSendMessage } = useChatroom(roomId);
  const { isMobile, showSidebar, setShowSidebar } = useUIStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasJoinedRoom) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, hasJoinedRoom]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={`${isMobile ? "w-full" : "w-3/4"} flex flex-col bg-transparent h-full relative`}>
      {isMobile && hasJoinedRoom && (
        <MobileHeader
          setCurrentChatroom={setCurrentChatroom}
          setHasJoinedRoom={setHasJoinedRoom}
          setMessages={setMessages}
          currentRoom={currentRoom}
          hasJoinedRoom={hasJoinedRoom}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      <div className={`flex-1 overflow-hidden ${isMobile && hasJoinedRoom ? "pt-16" : ""}`}>
        <AnimatePresence mode="wait">
          {roomId ? (
            joinedLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader isVisible />
              </div>
            ) : hasJoinedRoom ? (
              <HasJoinRoom
                setMessages={setMessages}
                setCurrentChatroom={setCurrentChatroom}
                setHasJoinedRoom={setHasJoinedRoom}
                messages={messages}
                hasJoinedRoom={hasJoinedRoom}
                messagesEndRef={messagesEndRef}
                onSendMessage={handleSendMessage}
                currentRoom={currentRoom}
                isMobile={isMobile}
              />
            ) : (
              <JoinRoom
                containerVariants={containerVariants}
                roomName={currentRoom?.name}
                handleJoinRoom={handleJoinRoom}
              />
            )
          ) : (
            <NoRoom
              isMobile={isMobile}
              containerVariants={containerVariants}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
