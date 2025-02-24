import '../App.css';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ConvertTable } from '../table';
import { Symbol2NumberInputArea } from '../symbol2number';
import { Number2SymbolInputArea } from '../number2symbol';
// import { SimpleButton } from './simpleButton';

function Index(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      {/* <SimpleButton /> */}
      <ConvertTable />
      <div className="convert-container flex flex-wrap justify-between sm:flex-none">
        <div className="box md:w-1/2">
          <Symbol2NumberInputArea />
        </div>
        <div className="box md:w-1/2">
          <Number2SymbolInputArea />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-5">
        <p>
          <a className="cursor-pointer" onClick={(): void => navigate('/help')}>
            help ?
          </a>
        </p>
      </div>
    </>
  );
}
export default Index;
