import './core/styles/global.scss';

import { useQuery, gql } from '@apollo/client';
import Layout from './core/layouts/layuot';
import TableContainer from './core/components/Table';
import { useEffect } from 'react';

import tableColors from "./core/json/tableColors.json";

const GET_COUNTRIES = gql`
query Query {
  countries {
    emoji
    code
    name
    native
    capital
    languages {
      code
    }
  } 
}
`;

interface ColorData {
  [colorSet: string]: {
    [colorKey: string]: string;
  };
}

function App() {

  const tableColorData: ColorData = tableColors;

  useEffect(() => {
    Object.keys(tableColorData).forEach((colorSet: any) => {
      const colors: any = tableColorData[colorSet];

      Object.keys(colors).forEach((colorKey) => {
        if (document.documentElement) {
          document.documentElement.style.setProperty(
            `--${colorSet}-${colorKey}`,
            colors[colorKey]
          );
        }
      });
      
    });
  }, [])

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  return (<>
    <Layout>
      <div className="mainContainer">
        {
          loading ? <p>Loading...</p> :
            error ? <p>Error : {error.message}</p> :
              <TableContainer data={data.countries} />
        }
      </div>
    </Layout>
  </>
  );
}

export default App;
