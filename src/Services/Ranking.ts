import { IDataFormat } from '../Utils/constant';

export interface IRanking {
  type: 'top' | 'bottom' | 'off';

  count: number;
}
export const ranking = (data: IDataFormat[], rankingConfig: IRanking) => {
  const { count } = rankingConfig;
  let rankedRows = [];
  switch (rankingConfig.type) {
    case 'top':
      {
        const rowsDesc = data.sort((eleA, eleB) => {
          return eleB.value1 - eleA.value1;
        });
        const topRows = rowsDesc.slice(0, count);
        const others = rowsDesc.slice(count);
        const otherValue = others.reduce(
          (res, val) => {
            res.value1 += val.value1;
            res.value2 += val.value2;
            return res;
          },
          { categoryId: 'Others', value1: 0, value2: 0 }
        );
        rankedRows = [...topRows, otherValue];
      }
      break;
    case 'bottom':
      {
        const rowsAsc = data.sort((eleA, eleB) => {
          return eleA.value1 - eleB.value1;
        });
        const bottomRows = rowsAsc.slice(0, count);
        const others = rowsAsc.slice(count);
        const otherValue = others.reduce(
          (res, val) => {
            res.value1 += val.value1;
            res.value2 += val.value2;
            return res;
          },
          { categoryId: 'Others', value1: 0, value2: 0 }
        );
        rankedRows = [...bottomRows, otherValue];
      }
      break;
    case 'off':
    default:
      rankedRows = [data, []];
      break;
  }
  return rankedRows;
};
