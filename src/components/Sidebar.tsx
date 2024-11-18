import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import Avatar from "./Avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Chatroom } from "@/types/chat";
import { useParams } from "react-router";
import { CreateChatroom } from "./CreateChatroom";
import { useState } from "react";

const Sidebar = ({ isMobile, showSidebar, data, setShowSidebar, handleRoomSelect }: { isMobile: boolean; showSidebar: boolean; setShowSidebar: (show: boolean) => void; handleRoomSelect: (room: string) => void; data: Chatroom[] | undefined }) => {
  const { roomId } = useParams<{ roomId?: string }>();
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 500 },
    },
    exit: {
      x: "-100%",
      transition: { type: "spring", damping: 25, stiffness: 500 },
    },
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <AnimatePresence>
      {(!isMobile || showSidebar) && (
        <motion.div
          key={"sidebar"}
          variants={isMobile ? sidebarVariants : {}}
          initial={isMobile ? "hidden" : false}
          animate="visible"
          exit="exit"
          className={`${isMobile ? "absolute top-0 left-0 h-full z-40 w-3/4" : "w-1/4"} bg-gray-900/50 overflow-y-scroll backdrop-blur-md border-r border-zinc-600 p-4`}
          style={{ scrollbarWidth: "none" }}
        >
          {isMobile && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Chatrooms</h2>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(false)}
                className="text-white"
              >
                <X size={24} />
              </Button>
            </div>
          )}
          {!isMobile && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white ">Chatrooms</h2>
              <button
                className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-primary"
                onClick={() => setOpenDialog(true)}
              >
                <Plus
                  size={40}
                  className="text-white"
                />
              </button>
            </div>
          )}

          <ul className="space-y-2">
            {data?.map((room) => (
              <motion.li
                key={room.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoomSelect(room.id)}
                className={`cursor-pointer relative flex items-center space-x-3 py-3 rounded-lg text-white`}
              >
                <div className={`absolute w-3 -left-5 transition-all group-hover:h-10 rounded-tr-2xl rounded-br-2xl ${roomId == room.id ? "bg-primary h-10" : "bg-white h-5"}`} />
                <Avatar
                  type="rings"
                  seed={room.name}
                />
                <span className="font-semibold">{room.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      <CreateChatroom
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AnimatePresence>
  );
};

export default Sidebar;
