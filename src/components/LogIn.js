import { Button } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { login } from '../features/userSlice';
import { auth, provider } from '../firebase';

function LogIn() {
    const dispatch = useDispatch();
    const signIn = () => {
      auth.signInWithPopup(provider)
      .then(user => {
          dispatch(login(
            {
              email: user.email,
              password: user.password,
              displayName: user.displayName,
              photoURL: user.photoURL
            }
          ))
        }).catch(error => alert(error))
    };
  return (
    <LogInContainer>
        <LogInSubContainer>
            <img src="https://yt3.ggpht.com/ytc/AMLnZu8r_JtuQom1K3RQqvuKRLtxy-d8kI04nx88FbPv0A=s900-c-k-c0x00ffffff-no-rj" alt="" />
            <h1>Sign in to the Slack</h1>
            <p>slack.com</p>
            <Button type='submit' onClick={signIn} >
                Sing in with google
            </Button>
        </LogInSubContainer>
    </LogInContainer>
  )
}

export default LogIn

const LogInContainer = styled.div`
    display: grid;
    place-items: center;
    min-height: 100vh;
    max-width: 100vw;
`;

const LogInSubContainer = styled.div`
    
    height: 40vh;
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    >img{
        width: 100px;

        :hover{
            transform: rotate(360deg);
            transition: 1s;
        }
    }
    >p{
        font-size: 14px;
    }
    >Button{
        text-transform: capitalize !important;
        background-color: #0a8d48;
        padding:5px 15px !important;
        font-size: 12px;
        font-weight: 500 !important;
        color: white;
        margin-top: 20px !important;
        :hover{
            background-color: #0a8d48 !important;
            opacity:.9 !important;
        }
    }
`