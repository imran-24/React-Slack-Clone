import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { enterRoom, roomSelected } from '../features/appSlice';
import { db } from '../firebase';

function SidebarOption({Icon , title, addChannnelOption, id}) {

  const dispatch = useDispatch();
  const selectedRoom = useSelector(roomSelected)


  const addChannel = () => {
    const channelName = prompt("Write a channel name ")
    
    if(channelName){
        db.collection('rooms').add({
            name: channelName,
        })
    }
  };

  const selectChannel = () => {
        dispatch(enterRoom(
        {
            id,
            title 
        }
    ))
  };

  return (
    <SidebarOptionContainer onClick={ addChannnelOption ? addChannel : selectChannel }>
        { Icon && <Icon className='icon'/> }
        {
            Icon ? <p>{title}</p>
                 : <p style={{ fontSize: 14}}> <span style={{ fontSize: 18}}>#</span> {title} </p>
        }
        
           

        
        
    </SidebarOptionContainer>

  )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px !important;
    padding-left: 24px !important;  
    
    color: white !important;
    font-size: 16px;
    font-weight: 400;
    .icon{
        color: white !important;
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
        margin-right: 10px !important
    }

    span{
        padding: 4px !important;
        margin-right: 10px !important
    }

    :hover{
        background-color: rgba(80,79,84, .6);
    }
`;