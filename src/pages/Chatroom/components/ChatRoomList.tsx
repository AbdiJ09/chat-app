import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useUIStore } from "@/store/ui.store";
import { useChatroom } from "@/hooks/useChatroom/index";

export interface Chatroom {
  id: string;
  name: string;
  users: { id: string; name: string }[];
}

export const ChatroomList = () => {
  const { isMobile, showSidebar, setShowSidebar } = useUIStore();
  const { chatrooms, selectRoom } = useChatroom();
  const navigate = useNavigate();
  const handleRoomSelect = (id: string) => {
    navigate(`/chatroom/${id}`);
    selectRoom(id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <Sidebar
      handleRoomSelect={handleRoomSelect}
      isMobile={isMobile}
      data={chatrooms}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
    />
  );
};
