import './core/styles/global.scss';

import { useQuery, gql } from '@apollo/client';

import detectQuery from './core/utils/detectQuery';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    console.log(selected);
  }, [selected])

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

  return (
    <div className="mainContainer">
      {
        loading ? <p>Loading...</p> :
          error ? <p>Error : {error.message}</p> :
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
                {data.countries.map(({ code, name, emoji, native, capital, currency }: any) => (
                  <div className={'tableBodyRow ' + `${ checkedControl(name + code) ? 'active' : ''}`} key={name + code} onClick={() => isSelect(name + code)}>
                    <span className='col'>{detectQuery(emoji)}</span>
                    <span className='col'>{detectQuery(code)}</span>
                    <span className='col'>{detectQuery(name)}</span>
                    <span className='col'>{detectQuery(native)}</span>
                    <span className='col'>{detectQuery(capital)}</span>
                    <span className='col'>{detectQuery(currency)}</span>
                  </div>
                ))}
              </div>
            </div>
      }
    </div>
  );
}

export default App;
