import { MyFile, MyFolder } from '../types/types';

export default function sortFiles(
  value: 'name' | 'size' | 'lastChange' | null,
  array: MyFile[] | MyFolder[],
  reverse: boolean,
) {
  function sortString(a: string, b: string) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  if (!value) return array;
  if (value === 'name') {
    const sortedArray = [...array.sort((a, b) => sortString(a[value], b[value]))];
    return reverse ? [...sortedArray.reverse()] : [...sortedArray];
  }
  const sortedArray = [...array.sort((fileA, fileB) => fileB[value] - fileA[value])];
  return reverse ? [...sortedArray.reverse()] : [...sortedArray];
}
