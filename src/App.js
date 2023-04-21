import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstagramRedirect from './Pages/Redirect/InstagramRedirect';
function App() {
  return (
    <Router>
    <div className='App'>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/instagram-redirect" element={<InstagramRedirect/>} />
    </Routes>
    </div>
  </Router>
  );
}

export default App;
