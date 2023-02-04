import { useAppDispatch } from '../../hooks';
import { changeHeaderModal, changeAsideModal } from '../../store/modalSlice';
import Aside from './components/Aside/Aside';
import Files from './components/Files/Files';
import Header from './components/Header/Header';
import './Explorer.css';

function Explorer() {
  const dispatch = useAppDispatch();

  function hiddenModal() {
    dispatch(changeHeaderModal(false));
    dispatch(changeAsideModal(false));
  }

  return (
    <div role='presentation' id='explorer' className='explorer' onClick={() => hiddenModal()}>
      <Header />
      <main className='main'>
        <Aside />
        <Files />
      </main>
    </div>
  );
}

export default Explorer;
