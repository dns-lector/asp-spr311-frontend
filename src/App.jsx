import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import Layout from './views/layout/Layout';
import Category from './views/category/Category';
import { AppContext } from './AppContext';
import Signup from './views/signup/Signup';
import { useState } from 'react';
import Profile from './views/profile/Profile';

export default function App() {
  const [token, setToken] = useState(null);

  const request = (url, conf) => new Promise( (resolve, reject) => {
    if(url.startsWith('/')) {
        url = "https://localhost:7211" + url;
    }
    if(token != null) {
      if(typeof conf == 'undefined') {
        conf = {};
      }      
      if(typeof conf['headers'] == 'undefined') {
        conf['headers'] = {};
      }      
      if(typeof conf['headers']['Authorization'] == 'undefined') {
        conf['headers']['Authorization'] = 'Bearer ' + token;
      }
    }
    
    fetch(url, conf)
    .then(r => r.json())
    .then(j => {
        if(j.status.isOk) {
            resolve(j.data);
        }
        else {
            reject(j);
        }
    });
  });

  return (
    <AppContext.Provider value={{request, token, setToken}}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='category/:id' element={<Category />} />
            <Route path='profile' element={<Profile />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}
