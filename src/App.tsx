import './styles/global.scss';
import { useQuery, gql } from '@apollo/client';


const GET_COUNTRIES = gql`
query Query {
  countries {
    name
    code
    languages {
      name
      native
    }
  } 
}
`;

function App() {

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  return (
    <div className="mainContainer">
      {
        loading ?  <p>Loading...</p> :
        error ? <p>Error : {error.message}</p> :
        data.countries.map(({ code, name }: any) => (
          <div key={code}> <span>{code}</span> - <span>{name}</span>
          </div>
        ))
      }
    </div>
  );
}

export default App;
