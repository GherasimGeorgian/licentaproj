import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch } from "./app/hooks";
import { fetchItems } from './features/Slice/productItems/productlistSlice';
import { MainPageModule } from './Components/MainPageModule';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { ContentPageView } from './Components/ContentPageView';
import ResponsiveAppBar from './Components/ResponsiveBarApp';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import { VirtualDressing } from './Components/VirtualDressing';
import { ViewProduct } from './Components/ViewProduct';
function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch<any>(fetchItems());
  }, [])

  return (
    <div className="App">
        
        <Router>
            <Routes>
                <Route path="/Products/:id" element={ <ViewProduct/>}/>
                <Route path="/Products"  element={ <ContentPageView />}/>
                <Route path="/t2"  element={<MainPageModule/>}/>
                <Route path="/login"  element={<LoginPage />}/>
                <Route path="/virtual-dressing/:id"  element={<VirtualDressing />}/>
                <Route path="/register"  element={<RegisterPage />}/>
                <Route path="*" element={<MainPageModule/>}/>
            </Routes>

        </Router>
       
    </div>
  );
}

export default App;
