import React, { useState } from 'react';
import Chatbot from './Chatbot';
import './index.css';
import ChartRenderer from './ChartRenderer';

const App: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: '85vw',
    margin: 'auto'
  };

  const chatbotContainerStyle = {
    marginLeft: showChart ? 'auto' : '0px'
  };

  return (
    <div className="component" style={showChart ? {} : containerStyle}>
      {showChart && (
        <div className="box">
          <div className="chart-holder">
            <h1 className="chart-name"> Chartbot-Chart</h1>
            <ChartRenderer />
          </div>
        </div>
      )}
      <div className="chatbot-container" style={chatbotContainerStyle}>
        <Chatbot showChart={showChart} setShowChart={setShowChart} />
      </div>
    </div>
  );
};

export default App;
