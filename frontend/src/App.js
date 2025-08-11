import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeDetails from './Components/EmployeeDetails';
import EmployeeManagementApp from './Components/EmployeeManagementApp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

