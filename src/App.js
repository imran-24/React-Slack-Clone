import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import styled from 'styled-components';
import { auth } from './firebase';
import LogIn from './components/LogIn';
import Spinner from 'react-spinkit';

function App() {

  const [user, loading] = useAuthState(auth);
  if(loading){
    return(
      <AppLoading>
        <AppLoadingContainer>
          <img src="https://yt3.ggpht.com/ytc/AMLnZu8r_JtuQom1K3RQqvuKRLtxy-d8kI04nx88FbPv0A=s900-c-k-c0x00ffffff-no-rj" alt="" />
          <Spinner name="wordpress" color="goldenrod" fadeIn='none'/>
        </AppLoadingContainer>
      </AppLoading>

    )
  }
  return (
    <Router>

      <div className="app">

        {
          !user  
          ? <LogIn /> 
          : <>
              <Header />
              <AppBody>
                <Sidebar />
      
                <Routes>
                  
                    <Route path='/' element={ <Chat /> } />
                    
                </Routes>
      
      
      
              </AppBody>
            </> 
        }
        
      </div>
      
      
    </Router>
      
  );
}

export default App;

const AppBody = styled.div`
    
    min-height:calc(100vh - 3rem) !important ;
    display: flex;
    align-items: center;
    background-color: black !important;
`;



const AppLoading = styled.div`
    display: grid;
    place-items: center;
    min-height: 100vh;
    width: 100vw;
`;

const AppLoadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   >img{
        width: 100px;
        margin-bottom: 20px;
        transform: rotate(360deg);
        transition: 1s;
        
    }
`;