import './core/styles/global.scss';

import { useQuery, gql } from '@apollo/client';

import detectQuery from './core/utils/detectQuery';
import { useEffect, useState } from 'react';
import calculatePagination from './core/utils/calculatePagination';

const GET_COUNTRIES = gql`
query Query {
  countries {
    name
    code
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  } 
}
`;

function App() {

  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [selected, setSelected] = useState<string[]>([]);
  const [paginationList, setPaginationList] = useState<Object[]>([]);
  const [paginationCount, setPaginationCount] = useState<number>(1);
  const [currentPagination, setCurrentPagination] = useState<number>(1);

  

  useEffect(() => {
    if (data) {
      console.log(data);
      
      setPaginationList(data.countries.slice(0, 10));
      setPaginationCount(calculatePagination(data.countries.length, 10))
    }
  }, [data])

  useEffect(() => {
    if (data) {
      // let detectPagination = currentPagination > 0 ? (currentPagination * 10) : 0;
      let detectPagination =   currentPagination > 1 ? currentPagination - 1 : 0 ;
      setPaginationList(data?.countries.slice((detectPagination * 10), (detectPagination * 10) + 10));
    }
  }, [data ,currentPagination])

  function isSelect(param:string) {
    const detectedSelectObj = selected.some((selectObj: any) => selectObj === param);
    
    if (!detectedSelectObj) {
      setSelected((prevState: any) => [...prevState, param]);
    } else {
      setSelected((prevState: any) => prevState.filter((selectedObj: string) => selectedObj !== param));
    }
  }

  function checkedControl(rowParam: string) {
    return selected.some(param => param === rowParam);
  }

  function prevPage(count:number) {
    if (currentPagination !== 1) setCurrentPagination(count - 1); 
  }

  function nextPage(count:number) {
    if (currentPagination !== paginationCount) setCurrentPagination(count + 1);
  }

  function goToPage(action : string, count: number) {
    if (action == 'firstPage') setCurrentPagination(1);
    else if (action == 'prevPage') setCurrentPagination(count - 1);
    else if (action == 'nextPage') setCurrentPagination(count + 1);
    else if (action == 'lastPage') setCurrentPagination(paginationCount);
  }

  return (
    <div className="mainContainer">
      {
        loading ? <p>Loading...</p> :
          error ? <p>Error : {error.message}</p> :
          <div className='tableConatiner'>
            <div className='table'>
              <div className='tableHeader'>
                  <span className='col'>Emoji</span>
                  <span className='col'>Code</span>
                  <span className='col'>Name</span>
                  <span className='col'>Native</span>
                  <span className='col'>Capital</span>
                  <span className='col'>Currency</span>
              </div>
              <div className='tableBody'>
                {paginationList.map(({ code, name, emoji, native, capital, currency }: any, index) => (
                  <div className={'tableBodyRow ' + `${ checkedControl(name + code) ? 'active' : ''}`} key={name + code} onClick={() => isSelect(name + code)}>
                    <span className='col' title={detectQuery(emoji)}>{detectQuery(emoji)}</span>
                    <span className='col' title={detectQuery(code)}>{detectQuery(code)}</span>
                    <span className='col' title={detectQuery(name)}>{detectQuery(name)}</span>
                    <span className='col' title={detectQuery(native)}>{detectQuery(native)}</span>
                    <span className='col' title={detectQuery(capital)}>{detectQuery(capital)}</span>
                    <span className='col' title={detectQuery(currency)}>{detectQuery(currency)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='tableFooter'>
              <button onClick={() => goToPage('firstPage', currentPagination)} disabled={!(currentPagination !== 1)}>{'<<'}</button>
              <button onClick={() => goToPage('prevPage', currentPagination)} disabled={!(currentPagination !== 1)}>{'<'}</button>
              <>{currentPagination}-{paginationCount}</>
              <button onClick={() => goToPage('nextPage', currentPagination)} disabled={!(currentPagination !== paginationCount)}>{'>'}</button>
              <button onClick={() => goToPage('lastPage', currentPagination)} disabled={!(currentPagination !== paginationCount)}>{'>>'}</button>
            </div>
          </div>
          
      }
    </div>
  );
}

export default App;
