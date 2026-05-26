import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import {Provider} from "react-redux";
import store from "./redux/store";
import Admin from "./components/Admin/Admin";
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<ProtectedRoute>
      <Home/>
    </ProtectedRoute>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/admin" element={
      <ProtectedRoute>
        <Admin/>
      </ProtectedRoute>
     }/>
  </Routes>
  </BrowserRouter>
    </Provider>
  
  );
}

export default App;
