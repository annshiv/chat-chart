import React from 'react';
import { BarChart } from './Chart container/BarChart';
import { LineChart } from './Chart container/LineChart';
import store from './redux/store';
import { ETemplateId, IState } from './redux/templateSlice';
import { applyRanking } from './Services/Ranking';
import { applySorting } from './Services/Sorting';
import { sampleDataJson } from './Utils/constant';

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

const ChartRenderer: React.FC = () => {
  const { template } = store.getState().config;
  let chart = null;
  switch (template) {
    case ETemplateId.BAR:
      chart = <BarChart data={getData()} />;
      break;
    case ETemplateId.LINE:
      chart = <LineChart data={getData()} />;
      break;
    default:
      null;
  }
  return (
    <div className="chart-container">
      {/* {<Loader />} */}
      {chart}
    </div>
  );
};
export default ChartRenderer;
