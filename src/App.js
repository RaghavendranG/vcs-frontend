import './App.css';
import HomePage from './components/Homepage';
import { Route, Routes } from 'react-router-dom';
import EditFile from './components/EditFile';
import ViewCommits from './components/ViewCommits';
import CreateRepository from './components/CreateRepository';
import LogIn from './components/Login';




function App() {

  return (
    
    <Routes>
      <Route path='/'element={<LogIn/>}/>
      <Route path='/homepage' element={<HomePage />}/>
      <Route path='/editFile/:id' element={<EditFile/>}/>
      <Route path='/commits/:id'element={<ViewCommits/>}/>
      <Route path='/create'element={<CreateRepository/>}/>
    </Routes>
  );
}

export default App;