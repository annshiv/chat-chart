import React, { useState } from 'react';

import ChartRenderer from './ChartRenderer';
import Chatbot from './Chatbot';
import './index.css';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import ChartPreviewRenderer from './ChartPreviewRenderer';
import { initialState } from './redux/templateSlice';

const App: React.FC = () => {
  const [showChart, setShowChart] = useState(false);
  const [config, setConfig] = useState(initialState)

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: '85vw',
    margin: 'auto'
  };

  const chatbotContainerStyle = showChart
    ? {}
    : {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

  return (
    <div className="component" style={showChart ? {} : containerStyle}>
      {showChart && (
        <div className="box">
          <div className="chart-holder">
            <h1 className="chart-name"> Chartbot-Chart</h1>
            <ChartRenderer config={config}/>
          </div>
          <ChartPreviewRenderer/>
        </div>
      )}
      <div className="chatbot-container" style={chatbotContainerStyle}>
        <Chatbot showChart={showChart} setShowChart={setShowChart} config={config} setConfig={setConfig} />
      </div>
    </div>
  );
};

const mapState = (state: RootState) =>({
  config: state.config
})
export default connect(mapState, null)(App);
