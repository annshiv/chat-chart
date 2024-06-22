import React from 'react';
import { BarChart } from './Chart container/BarChart';
// import { LineChart } from './Chart container/LineChart';
// import { LollipopChart } from './Chart container/LollipopChart';
import Chatbot from './Chatbot';
import './index.css';
import { sampleDataJson } from './Utils/constant';

const App: React.FC = () => {
  return (
    <div className="component">
      <div className="box">
        <h1>Chatbot-Chart</h1>
        {/* <LollipopChart /> */}
      </div>
      <div className="chatbot-container">
        {/* <LineChart /> */}
        <BarChart data={sampleDataJson} />
        <Chatbot />
      </div>
    </div>
  );
};

export default App;
