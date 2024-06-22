import React, { useState } from 'react';
import Chatbot from './Chatbot';
import './index.css';

const App: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: '85vw',
    margin: 'auto', 
  };

  const chatbotContainerStyle = {
    marginLeft: showChart ? 'auto' : '0px',
  };

  return (
    <div className="component" style={showChart ? {} : containerStyle}>
      {showChart && (
        <div className="box">
          <h1>Chatbot-Chart</h1>
        </div>
      )}
      <div className="chatbot-container" style={chatbotContainerStyle}>
        <Chatbot showChart={showChart} setShowChart={setShowChart} />
      </div>
    </div>
  );
};

export default App;
