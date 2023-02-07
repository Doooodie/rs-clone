import { useTranslation } from 'react-i18next';
import convertNumberToDate from '../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../helpers/convertBytesToKbMd';
import { addActiveClassOnDriveItem } from '../../helpers/handleFileItem';
import './File.css';

type FileProps = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
  onContextMenu: (value: any) => void;
};

export default function File({ name, owner, lastChange, size, id, onContextMenu }: FileProps) {
  const { t } = useTranslation();
  const { convertedSize, convertedName } = convertBytesToKbMb(size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;

  return (
    <div
      role='presentation'
      className='file-item'
      onContextMenu={(e) => onContextMenu(e)}
      onClick={(e) => addActiveClassOnDriveItem(e)}
      id={`${id}`}
    >
      <div className='file-item-img'>
        <img
          src='https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document'
          alt='docs'
        />
        <span>{name}</span>
      </div>

      <div className='file-item-info file-item-owner'>
        <span>{owner}</span>
      </div>

      <div className='file-item-info file-item-time'>
        <span>{convertNumberToDate(lastChange)}</span>
      </div>

      <div className='file-item-info file-item-size'>
        <span>{sizeString}</span>
      </div>
    </div>
  );
}
