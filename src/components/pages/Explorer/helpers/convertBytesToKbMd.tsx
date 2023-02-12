interface IConvertedSize {
  convertedSize: number;
  convertedName: string;
}

export default function convertBytesToKbMb(bytes: number) {
  const ONE_KB = 1024;
  const ONE_MB = ONE_KB * ONE_KB;
  const sizeInfo: IConvertedSize = {
    convertedSize: 0,
    convertedName: '',
  };

  if (bytes < ONE_KB) {
    sizeInfo.convertedSize = bytes;
    sizeInfo.convertedName = 'bytes';
    return sizeInfo;
  }
  if (bytes < ONE_MB) {
    sizeInfo.convertedSize = Math.round(bytes / ONE_KB);
    sizeInfo.convertedName = 'kb';
    return sizeInfo;
  }
  sizeInfo.convertedSize = Math.round(bytes / ONE_MB);
  sizeInfo.convertedName = 'mb';
  return sizeInfo;
}
