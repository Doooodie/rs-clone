import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const imgSource = 'https://ssl.gstatic.com/docs/doclist/images/empty_state_details.png';

const DefaultDetailsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 10px;
  img {
    width: 200px;
    height: 200px;
  }

  p {
    width: max-content;
  }
`;

export default function DefaultDetails() {
  const { t } = useTranslation();
  return (
    <DefaultDetailsStyle>
      <img src={imgSource} alt='planet' />
      <p>{t('explorer.select')}</p>
    </DefaultDetailsStyle>
  );
}
