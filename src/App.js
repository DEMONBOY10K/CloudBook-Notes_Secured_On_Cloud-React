import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SingUp';

function App() {
  // const a={
  //   msg: "message", type : "success"
  // }
  const [alert, setAlert] = useState();
  const showAlert =(message,type)=>{
    setAlert({
      msg: message, type : type
    })
    setTimeout(()=>{
      setAlert(null);
    },2500)
  }
  useEffect(() => {
    showAlert("This is an alert","success")
  }, [])
  
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={
              <Home/>
            }>
            </Route>
            <Route exact path="/about" element={
              <About/>
            }>
            </Route>
            <Route exact path="/login" element={
              <Login showAlert={showAlert}/>
            }>
            </Route>
            <Route exact path="/signup" element={
              <SignUp/>
            }>
            </Route>
          </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;