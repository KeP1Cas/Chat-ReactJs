import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import { useContext } from 'react';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';

function App() {
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth);

  if(loading) {
    return <Loader/>
  }

  return (
    <Router className="App">
      <NavBar/>
      <AppRouter/>
    </Router>
  );
}

export default App;
