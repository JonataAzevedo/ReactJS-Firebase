import { useState } from 'react';
import './home.css';
import '../../index.css';

import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true} )
      })
      .catch((e) => {
        alert("Erro" + e);
      })
    }else{
      alert();
    }
  }

  return (
    <div className='home-container'>
      <h1>Login</h1>
      <span>Gerenciador simplificado</span>

      <form className='form' onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='Digite seu Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Digite sua Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Acessar</button>

      </form>

      <Link className='button-link' to='/register'>
        Não Possui uma conta ? Cadastre - se
      </Link>

    </div>
  )
}