import axios from 'axios';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    //01310930/json/

    if(input === ''){
      alert('Preencha algum CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch{
      alert("Ops erro ao buscar cep")
      setInput("")
    }

  }

  return(
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>

        </main>
    </div>
  );

}

export default App;