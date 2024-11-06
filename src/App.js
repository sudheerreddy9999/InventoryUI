import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import {  Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inventory' element={<Inventory/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
