import Aside from './components/Aside/Aside';
import Files from './components/Files/Files';
import Header from './components/Header/Header';
import './Explorer.css';

function Explorer() {
  return (
    <div className='explorer'>
      <Header />
      <main className='main'>
        <Aside />
        <Files />
      </main>
    </div>
  );
}

export default Explorer;
