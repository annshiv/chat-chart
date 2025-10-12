import React from 'react';
import { BarChart } from './Chart container/BarChart';
import { LineChart } from './Chart container/LineChart';
import store from './redux/store';
import { ETemplateId, IState } from './redux/templateSlice';
import { applyRanking } from './Services/Ranking';
import { applySorting } from './Services/Sorting';
import { sampleDataJson } from './utils/constant';

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
interface IProps2 {
  config: IState
}

const ChartRenderer: React.FC<IProps2> = (props:IProps2 ) => {
  const { config} = props
  const { template } = config as IState
  let chart = null;

  switch (template) {
    case ETemplateId.BAR:
      chart = <BarChart data={getData(config)} />;
      break;
    case ETemplateId.LINE:
      chart = <LineChart data={getData(config)} />;
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
// const mapState = (state: RootState) =>({
//   config: state.config
// })
// type TMapState = Partial<ReturnType<typeof mapState>>

export default ChartRenderer
