
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './User/UserProfile';
import Login from './User/Login';
import Register from './User/Register';
import AdminHomePage from './Admin/AdminHomePage';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/adminhome' element={<AdminHomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
    </div>
  );
}

export default App;
