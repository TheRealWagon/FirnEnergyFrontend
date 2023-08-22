import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar'
import Body from './components/body/bodyContainer'
import { LoginPage, HomePage, WebsiteHomePage, WebAdminPage } from './components/pages/pages'
import { Routes, Route, Router} from "react-router-dom";

function App() {

    const [darkMode, setDarkmode] = useState(false);

    const toggleDarkMode = () => {
        setDarkmode(!darkMode);
    }

  return (
    <>
      <Routes>
        <Route index element={<WebsiteHomePage></WebsiteHomePage>}></Route>
        <Route path="LoginPage" element={<LoginPage></LoginPage>}></Route>
        <Route path='HomePage' element={<HomePage></HomePage>}></Route>
        <Route path='AdminPage' element={<WebAdminPage></WebAdminPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
