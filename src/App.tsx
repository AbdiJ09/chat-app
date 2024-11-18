import { Route, Routes } from "react-router";
import ChatroomPage from "@/pages/Chatroom/index";
import HomePage from "@/pages/Home";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/chatroom/:roomId?"
        element={<ChatroomPage />}
      />
    </Routes>
  );
};

export default App;
