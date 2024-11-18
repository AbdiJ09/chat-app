import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChatroomListMobile } from "./ChatroomListMobile";
import { useUIStore } from "@/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { isMobile } = useUIStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="p-5 border-t bg-gray-900/50 backdrop-blur-md border-zinc-600">
      <div className="flex items-center space-x-3">
        {/* Input */}
        <Input
          type="text"
          autoFocus
          className="w-full py-6 text-white border bg-secondary-foreground border-zinc-600"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit(e)}
        />

        {/* Tombol untuk Desktop atau Mobile */}
        <div>
          <AnimatePresence mode="wait">
            {isMobile ? (
              message ? (
                <motion.button
                  key="sendButton"
                  onClick={handleSubmit}
                  className="flex items-center justify-center w-12 h-12 p-3 text-white rounded-full bg-primary hover:bg-primary/90"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>
                    <SendIcon size={27} />
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="chatroomList"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatroomListMobile />
                </motion.div>
              )
            ) : (
              <motion.button
                key="desktopSendButton"
                onClick={handleSubmit}
                className="flex items-center justify-center w-12 h-12 p-3 text-white rounded-full bg-primary hover:bg-primary/90"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <span>
                  <SendIcon size={27} />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
