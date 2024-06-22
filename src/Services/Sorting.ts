import { IDataFormat } from '../Utils/constant';

type TSortType = 'ascending' | 'descending' | 'off';
export interface ISorting {
  type: TSortType;
}
export const applySorting = (data: IDataFormat[], sortingConfig: ISorting) => {
  let sortedRows = [];
  switch (sortingConfig.type) {
    case 'ascending':
      {
        sortedRows = data.sort((eleA, eleB) => {
          return eleA.value1 - eleB.value1;
        });
      }
      break;
    case 'descending':
      {
        sortedRows = data.sort((eleA, eleB) => {
          return eleA.value1 - eleB.value1;
        });
      }
      break;
    case 'off':
    default:
      sortedRows = [...data];
      break;
  }
  return sortedRows;
};
