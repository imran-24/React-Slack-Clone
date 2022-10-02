import { Spa } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { roomSelected } from '../features/appSlice';
import { db } from '../firebase';


import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ChatInput from './ChatInput';
import Message from './Message';

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(roomSelected);
  const [roomDetails] = useDocument(roomId && db.collection('rooms').doc(roomId.id));
  
  const [roomMessages, loading] = useCollection( roomId &&
    db.collection('rooms')
    .doc(roomId.id)
    .collection('messages')
    .orderBy('timestamp', 'asc'));
  useEffect( () => {
    chatRef?.current?.scrollIntoView({behavior: "smooth"});
  },[roomId, loading])
  return (
    <ChatContainer>
        { roomDetails && (
            <>
            <ChatHeader>
            <ChatHeaderLeft>
               <h2>#{roomDetails?.data().name}</h2>
               <ExpandMoreRoundedIcon />
            </ChatHeaderLeft>

            <ChatHeaderRight>
                <PersonAddRoundedIcon className='icon'/>
            </ChatHeaderRight>
        </ChatHeader>
        <ChatBookMark>
            <AddRoundedIcon />
            <p>Add a bookmark
            
            </p>

        </ChatBookMark>

        <ChatMessages>
        {
            roomMessages?.docs.map(doc => {
                const { description, message, name, photoUrl, timestamp} = doc.data();
                return (
                    
                    <Message 
                        key={doc.id}
                        message = {message}
                        description = {description} 
                        phototUrl = {photoUrl}
                        timestamp = {timestamp}
                    />
                )

            })
        }

        <ChatBottom ref={chatRef} />
        </ChatMessages>

        <ChatInput
            chatRef={chatRef}
            RoomId = {roomId?.id}
        />
        </>
        )}
            
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
    
    width: 80%;
    position: absolute;
    left: 20%;
    top: 3rem;
    background-color: black;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 3rem);
    .icon{
        color: darkgray;
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
    }
    
    
`;

const ChatHeader = styled.div`
    position: fixed;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:9px 10px !important;
    border-bottom: 1px solid rgb(63, 63, 63) !important;
    background-color: black;
    z-index: 1;
`;

const ChatHeaderLeft = styled.div`
    color: lightgray;
    display: flex;
    align-items: center;
`;

const ChatHeaderRight = styled.div`

    .icon{
        color: lightgray;
    border: 1px solid lightgray;
    border-radius: 5px;
    }

`;

const ChatBookMark = styled.div`
    position: fixed;
    width: 80%;
    top: 100px;
    margin: 1px 0 !important;
    background-color: black;
    color: lightgray;
    display: flex;
    align-items: center;
    padding:9px 10px !important;
    border-bottom: 1px solid rgb(63, 63, 63);
    font-size: 15px;
    z-index: 1;
`;

const ChatMessages = styled.div`
    width: 100%;
    position: absolute;
    top: 100px;
    background-color:black;

`;

const ChatBottom = styled.div`
    padding-bottom: 100px !important;
`;