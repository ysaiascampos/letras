import React, { Fragment, useState, useEffect } from 'react';
import Axios from 'axios';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {
  const [busquedaletra, setBusquedaletra] = useState({});
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({})

  useEffect(() => {
    
    const consultarAPI = async () => {
      if(Object.keys(busquedaletra).length === 0) return;
      const {artista, cancion} = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const [letra, informacion] = await Promise.all([
        Axios(url),
        Axios(url2)
      ]);
      setLetra(letra.data.lyrics);
      setInfo(informacion.data.artists[0]);
    }
    consultarAPI();
  }, [busquedaletra, info])
  return (
    <Fragment>
      <Formulario setBusquedaletra={setBusquedaletra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
