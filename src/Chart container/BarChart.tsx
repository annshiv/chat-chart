import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { getDataObj, IDataFormat } from '../Utils/constant';
export interface IProps {
  data: IDataFormat[];
}
export const BarChart: React.FC<IProps> = (props: IProps) => {
  const { categories, value1, value2 } = getDataObj(props.data);
  const config = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Corn vs wheat estimated production for 2020',
      align: 'left'
    },
    subtitle: {
      text: 'subtitle',
      align: 'left'
    },
    xAxis: {
      categories,
      crosshair: true,
      accessibility: {
        description: 'Countries'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '1000 metric tons (MT)'
      }
    },
    tooltip: {
      valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Corn',
        data: value1
      },
      {
        name: 'Wheat',
        data: value2
      }
    ]
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={config} />
    </>
  );
};
