import './App.css';
import Register from './register';
import Login from './Login';
import Home from './Home';
import {HashRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Forgotpass from './forgotPassword';
import ResetPassword from './ResetPassword';
import Cookies from 'universal-cookie';
function App() {
  const cookies = new Cookies();
  const [logged, setLogged] = useState(cookies.get('token')? true : false);
  const [regist, setRegist] = useState(false);
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={logged ? <Home logged={logged} setLogged={setLogged}/> : (!regist? <Login setLogged={setLogged} setRegist={setRegist}/> : <Register setRegist= {setRegist}/>)} />
        <Route path='/password/forgot' element = {<Forgotpass/>} />
        <Route path='/password/reset/:token' element = {<ResetPassword/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
