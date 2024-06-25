import React from 'react';
import { BarChart } from './Chart container/BarChart';
import { LineChart } from './Chart container/LineChart';
import store, { RootState } from './redux/store';
import { ETemplateId, IState } from './redux/templateSlice';
import { applyRanking } from './Services/Ranking';
import { applySorting } from './Services/Sorting';
import { sampleDataJson } from './Utils/constant';
import {  connect } from 'react-redux';

const getData = (config?: IState) => {
  const { ranking, sorting } = config ?? store.getState().config;
  let data = [...sampleDataJson];
  if (ranking.type !== 'off') {
    data = applyRanking(data, ranking);
  }
  if (sorting.type !== 'off') {
    data = applySorting(data, sorting);
  }
  return data;
};

const ChartPreviewRenderer: React.FC = (props:TMapState ) => {
  const { previewData }= props
  if(!Object.keys((previewData as object)  ).length) return null
  const { template } = previewData as IState

  let chart = null;
  switch (template) {
    case ETemplateId.BAR:
      chart = <BarChart data={getData(previewData)} />;
      break;
    case ETemplateId.LINE:
      chart = <LineChart data={getData(previewData)} />;
      break;
    default:
      null;
  }
  return (
    <div className=" side-panel chart-holder">
      <div className="close-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="12"
          height="12"
          viewBox="0 0 24 24">
          <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path>
          <path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
        </svg>
      </div>
      {chart}
    </div>
  );
};

type TMapState = Partial<ReturnType<typeof mapState>>

const mapState = (state: RootState) => ({
  previewData: state.previewData
})

export default connect(mapState, null)(ChartPreviewRenderer);
