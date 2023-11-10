import React, { FC, useState } from 'react';
import { Layout, PageBlock } from 'vtex.styleguide'
/* import { useQuery } from 'react-apollo' */
/* import helloworld from './graphql/helloworld.gql' */

const AdminExample: FC = () => {

/*   const { data } = useQuery(helloworld) */

/*   console.log('data que llega:', data); */

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  return (
    <Layout>
      <PageBlock
         title="Datos de API Blister"
         subtitle="Introducir datos entregados por Blister para el funcionamiento de la app."
         variation="full"
      >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', padding: '3rem', width: '25rem'}}>
      {/* <p>{data?.helloworld}</p> */}
      <h3>Introducir datos de Blister</h3>
      <input type="text" placeholder="Usuario" value={username} onChange={handleUsernameChange} style={{margin: '1rem'}} />
      <input type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} style={{margin: '1rem'}} />
      <button>Cargar datos de API</button>
    </div>
      </PageBlock>
    </Layout>
  );
}

export default AdminExample;
