import React, { useState } from 'react';

import ChartRenderer from './ChartRenderer';
import Chatbot from './Chatbot';
import './index.css';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import ChartPreviewRenderer from './ChartPreviewRenderer';

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
          <ChartPreviewRenderer/>
        </div>
      )}
      <div className="chatbot-container" style={chatbotContainerStyle}>
        <Chatbot showChart={showChart} setShowChart={setShowChart} />
      </div>
    </div>
  );
};

const mapState = (state: RootState) =>({
  config: state.config
})
export default connect(mapState, null)(App);
