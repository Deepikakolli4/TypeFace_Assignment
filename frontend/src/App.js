import './App.css';
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/register';
import Login from './pages/login';
import Upload from './pages/Upload'
import './App.css'

const PrivateRoute = ({children}) =>{
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to ="/login" />;
};

function App() {
  return (
    <Router>
    <Navbar />
    <div className="app-container">
      <Routes>
        <Route path = '/register' element = {<Register/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/dashboard' element = 
        {<PrivateRoute>{<Dashboard/>} </PrivateRoute>}
        />
        <Route path = '/transcations' element = 
        {<PrivateRoute>{<Transcations/>} </PrivateRoute>}
        />
        <Route path = '/upload' element = 
        {<PrivateRoute>{<Upload/>} </PrivateRoute>}
        />
        <Route path = '/' element = {< Navigate to = "/login"/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
