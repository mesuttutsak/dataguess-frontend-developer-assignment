import './core/styles/global.scss';

import { useQuery, gql } from '@apollo/client';
import Layout from './core/layouts/layuot';
import TableContainer from './core/components/Table';

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

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  return (
    <Layout>
      <div className="mainContainer">
        {
          loading ? <p>Loading...</p> :
          error ? <p>Error : {error.message}</p> :
          <TableContainer data={data.countries} />
        }
      </div>
    </Layout>
  );
}

export default App;
