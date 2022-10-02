import { Avatar } from '@material-ui/core';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';

function Message({ message, description, photoUrl, timestamp}) {
    const [user] = useAuthState(auth)
  return (
    <MessageContainer>
            <ProfilePic src={user?.photoURL} />
            <MessageInfo>
                <MessagHeader>
            
                    <h4>{description}</h4>
                    <p className='timestamp'>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </p>
                    
                </MessagHeader>
                <MessageBody>
                    <p>{message} </p>
                    
                    
                </MessageBody>
            </MessageInfo>
        
        

    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
  width: 100% !important;
  display: flex;
  padding-left:10px !important ;
  margin: 20px 0 !important;
  
  
    :hover{
       
        background-color: rgba(65,65, 65, .6);
    }
    
`;

const ProfilePic = styled(Avatar)`
        width: 45px;
        height: 45px;
        object-fit: cover;
        border-radius: 5px !important;
        margin: 10px !important;
    
`;

const MessageInfo = styled.div`
   
`

const MessageBody = styled.div`
   >p{
    color: gray;
    font-weight: 500;
    padding-bottom: 5px !important;
   }
`
const MessagHeader = styled.div`
     color: whitesmoke !important;
     display: flex;
     align-items: baseline;
     margin-top: 5px !important;
     h4{
        font-size: 18px;
     }
     
     
     > .timestamp{
        font-size: 12px;
        color: lightgray;
        margin-left: 10px !important;
     }
`;