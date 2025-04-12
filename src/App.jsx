import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import Layout from './views/layout/Layout';
import Category from './views/category/Category';
import { AppContext } from './AppContext';

export default function App() {
  
  const request = (url, conf) => new Promise( (resolve, reject) => {
    if(url.startsWith('/')) {
        url = "https://localhost:7211" + url;
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
    <AppContext.Provider value={{request}}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='category/:id' element={<Category />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}
