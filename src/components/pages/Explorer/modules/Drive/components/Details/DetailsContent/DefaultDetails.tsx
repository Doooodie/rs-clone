import styled from 'styled-components';

export default function DefaultDetails() {

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
  return (
    <DefaultDetailsStyle>
      <img src={imgSource} alt="planet" />
      <p>Select an item to see the details</p>
    </DefaultDetailsStyle>
  )
}
