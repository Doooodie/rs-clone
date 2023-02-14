import { useTranslation } from 'react-i18next';
import CartIcon from '../../../../../../assets/SvgComponents/CartIcon';
import MyDescIcon from '../../../../../../assets/SvgComponents/MyDescIcon';
import StarIcon from '../../../../../../assets/SvgComponents/StarIcon';

type AsideButtonProps = {
  className: string;
  name: string;
  onClick: () => void;
}

export default function AsideButton({ className, name, onClick }: AsideButtonProps) {

  const { t } = useTranslation();
  
  return (
    <button
        type='button'
        className={className}
        onClick={onClick}
        >
        <span className='icon'>
        {
          {
            'drive': <MyDescIcon />,
            'important': <StarIcon />,
            'trash': <CartIcon />,
          }[name]
      }
        </span>
        <span>{t(`explorer.${name}`)}</span>
    </button>
  )
}
