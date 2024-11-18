import { Message } from "@/types/chat";
import Avatar from "./Avatar";
import { motion } from "framer-motion";
import { RefObject } from "react";
import { getUserId } from "@/helper/userId";

interface MessagesContainerProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

const MessagesContainer = ({ messages, messagesEndRef }: MessagesContainerProps) => {
  const userId = getUserId();

  return (
    <div
      className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-900/50 backdrop-blur-md "
      style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
    >
      {messages.map((msg, index) => {
        const isCurrentUser = msg.user.id == userId?.toString();
        const convertCreateAt = new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        return (
          <motion.div
            key={`msg-${index}`}
            initial={{ opacity: 0, x: isCurrentUser ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start space-x-3 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
          >
            <Avatar
              seed={msg.user.id}
              type="dylan"
            />
            <div className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${isCurrentUser ? "bg-primary text-white rounded-tr-none" : "bg-secondary-foreground text-white rounded-tl-none"}`}>
              <div className={`text-sm font-semibold mb-1 ${isCurrentUser ? "text-right text-white" : "text-left text-gray-200"}`}>{msg.user.name}</div>
              <p className={`${isCurrentUser ? "text-right text-gray-200" : "text-left text-gray-300"}`}>{msg.content}</p>
              <span>
                <div className={`text-xs mt-2  ${isCurrentUser ? "text-right text-gray-300" : "text-left text-gray-500"}`}>{convertCreateAt}</div>
              </span>
            </div>
          </motion.div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
