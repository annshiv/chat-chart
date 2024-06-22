export interface IDataFormat {
  categoryId: string;
  value1: number;
  value2: number;
}

export const sampleDataJson: IDataFormat[] = [
  { categoryId: 'USA', value1: 406292, value2: 51086 },
  { categoryId: 'China', value1: 260000, value2: 136000 },
  { categoryId: 'Brazil', value1: 107000, value2: 5500 },
  { categoryId: 'EU', value1: 68300, value2: 141000 },
  { categoryId: 'India', value1: 27500, value2: 107180 },
  { categoryId: 'Russia', value1: 14500, value2: 77000 }
];

export const getDataObj = (data: IDataFormat[]) => {
  const categories: string[] = [];
  const value1: number[] = [];
  const value2: number[] = [];
  data.forEach((ele) => {
    categories.push(ele.categoryId);
    value1.push(ele.value1);
    value2.push(ele.value2);
  });
  return { categories, value1, value2 };
};
