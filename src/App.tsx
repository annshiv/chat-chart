import React from "react";
import Chatbot from "./Chatbot";
import './index.css';

const App: React.FC = () => {
  return (
    <div className="component">
      <div className="box">
        <h1>Chatbot-Chart</h1>
      </div>
      <div className="chatbot-container">
        <Chatbot />
      </div>
    </div>
  );
};

export default App;
