import React, { useState } from 'react';
import ChartRenderer from './ChartRenderer';
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
            {/* <BarChart data={sampleDataJson} /> */}
          </div>
          <div className=" side-panel chart-holder">
            <div className='close-icon'>
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                >
                    <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path>
                    <path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
                </svg>
            </div>
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
