import { Sheet } from "react-modal-sheet";
import { useState } from "react";
import { useChatroom } from "../hooks/useChatroom";
import { motion } from "framer-motion";
import Avatar from "./Avatar";
import { ChevronRight, Layers } from "lucide-react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { CreateChatroom } from "./CreateChatroom";
import { Button } from "./ui/button";

export const ChatroomListMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const { chatrooms, selectRoom, hasJoinedRoom } = useChatroom();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleRoomSelect = (id: string) => {
    navigate(`/chatroom/${id}`);
    selectRoom(id);
    queryClient.invalidateQueries({ queryKey: ["chatrooms"] });
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
    setOpenDialog(true);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-3 py-3 text-white ${!hasJoinedRoom && "absolute z-50 bottom-5 left-2/4 -translate-x-2/4 w-3/4"} shadow-lg ${hasJoinedRoom && "rounded-full w-12 h-12 flex items-center justify-center"} font-semibold rounded-2xl  bg-gradient-to-r from-primary to-violet-500 hover:shadow-2xl`}
      >
        {hasJoinedRoom ? <Layers size={28} /> : "Chose a room or Create a new one"}
      </button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[0.9, 0.5, 0.2]}
        initialSnap={1}
      >
        <Sheet.Container
          style={{
            backgroundColor: "#030712",
            borderTopLeftRadius: 20,
            zIndex: 5000,
            borderTopRightRadius: 20,
          }}
        >
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller
              className="px-6 py-5 "
              style={{ scrollbarWidth: "none" }}
            >
              <Button
                className="w-full mb-5"
                size={"lg"}
                onClick={handleCreate}
              >
                Create a new room
              </Button>
              <ul className="space-y-4">
                {chatrooms?.map((room, index) => {
                  const sumUserInRoom = room.users.length;
                  return (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(91, 33, 182, 0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      onClick={() => handleRoomSelect(room.id)}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative flex items-center p-4 space-x-3 rounded-2xl cursor-pointer bg-gradient-to-br from-[#2b164e] to-[#1a1b2d] shadow-lg"
                    >
                      <Avatar
                        type="rings"
                        seed={room.name}
                      />
                      <div className="flex-1">
                        <span className="text-lg font-semibold text-white">{room.name}</span>
                        <p className="text-sm text-gray-400">Active users: {sumUserInRoom}</p>
                      </div>
                      <ChevronRight
                        className="text-gray-400"
                        size={20}
                      />
                    </motion.li>
                  );
                })}
              </ul>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={() => setOpen(false)}
          style={{
            zIndex: 4000,
          }}
        />
      </Sheet>
      <CreateChatroom
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};
