import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './application/routes/AppRoutes';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App
