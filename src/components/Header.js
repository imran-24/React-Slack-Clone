import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Avatar } from '@material-ui/core';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React from 'react'

import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function Header() {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth)
    const signOut = () =>{
      dispatch(logout());
      auth.signOut();
    }
  return (
    <HeaderContainer>
        <HeaderLeft>
            <AccessTimeIcon className='icon watch'/>
        </HeaderLeft>
        <HeaderMiddle>
            <input type="search" name="" id="" />
            <TuneOutlinedIcon className='icon' />
            <SearchOutlinedIcon className='icon search'/>
        </HeaderMiddle>
        <HeaderRight>
            <HelpOutlineIcon className='icon help'/>
            <AccountProfile onClick={signOut} src={user?.photoURL}  className='icon' />
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header


const HeaderContainer = styled.div`
    
    width: 100%;
    height: 3rem;
    background-color: var(--slack-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(63, 63, 63);
    position: fixed;
    top:0;
    z-index: 1;
    .icon{
        color: darkgray;
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
    }
`;

const HeaderLeft = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: .3 !important;
    
 

    > .watch{
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
        margin-right: 30px !important;
        :hover{
            background-color: rgba(80,79,84, .6);
            border-radius: 5px;
        }
    }
 
   
`;



const HeaderMiddle = styled.div`

    flex: .4;
    display: flex;
    align-items: center;
    
    border: 1px solid  rgb(140, 140, 140) !important;
    padding: 0  10px !important;
    background-color: rgba(80,79,84, .5);
    border-radius: 5px;
    
    :hover{
        border: 1px solid rgb(200, 200, 200) !important;
    }
   > input{
        width: 100%;
        
        padding: 10px;
        border: none;  
        color: white;
        font-weight: 500;
        background-color: transparent;
        outline:none;

        
   }

   > .search{
       margin-left: 5px !important;
   }
`;

const HeaderRight = styled.div`
    flex: .3;
    color: darkgray;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > .help{
        margin-right: 10px !important;
        :hover{
            background-color: rgba(80,79,84, .6);
            border-radius: 5px;
        }
    }
   
`;

const AccountProfile = styled(Avatar)`
    cursor: pointer;
    margin-right: 20px !important;
    
    border-radius: 15px !important;
    :hover{
        opacity: .8;
    }

`