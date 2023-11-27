import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar'
import Body from './components/body/bodyContainer'
import { LoginPage, HomePage, WebsiteHomePage, WebAdminPage , ProfielPage} from './components/pages/pages'
import { Routes, Route, Router} from "react-router-dom";
import { useTranslation  } from 'react-i18next';
import './translations/i18n.js'


function App() {
    const { t , i18n } = useTranslation();
    i18n.on('languageChanged', (lng) => (document.documentElement.setAttribute('lang', lng)))
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
        <Route path='Industrie' element={<ProfielPage profiel='industrie'></ProfielPage>}></Route>
        <Route path='Horeca' element={<ProfielPage profiel='horeca'></ProfielPage>}></Route>
        <Route path='Residentieel' element={<ProfielPage profiel='residentieel'></ProfielPage>}></Route>
        <Route path='Landbouw' element={<ProfielPage profiel='landbouw'></ProfielPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
