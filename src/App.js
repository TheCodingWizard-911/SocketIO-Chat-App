import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import JoinChatRoom from "./join/joinChatRoom";
import ChatRoom from "./chat/chatRoom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={JoinChatRoom} />
      <Route path="/chat" component={ChatRoom} />
    </Router>
  );
}

export default App;
