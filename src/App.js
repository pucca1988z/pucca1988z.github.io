import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 

import Header from './components/Header';
import Orgnization from "./pages/Orgnization";
import MyTask from "./pages/MyTask"
import MyToken from "./pages/MyToken"
import Footer from "./components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function App() {
  return (
    <>
    <Router>
      <Header></Header>
        <Routes>
        <Route path="/" element={<Orgnization></Orgnization>}></Route>
        <Route path="/my-task" element={<MyTask></MyTask>}></Route>
        <Route path="/my-token" element={<MyToken></MyToken>}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
