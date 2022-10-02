import React, { useEffect, useState } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { Button } from '@material-ui/core';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({RoomId, chatRef}) {

    
    const [roomId] = useDocument(RoomId && db.collection('rooms').doc(RoomId));
    const [user] = useAuthState(auth)
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');

    // useEffect(
    //     () => {
    //         db.collection('messages')
    //           .onSnapshot(snapshot => (
    //             setMessage(snapshot.docs.map( doc => 
    //                 ({
    //                 id : doc.id,
    //                 data: doc.data(),
    //                 })
    //             ))
    //           ))
    //     },[])

    const sendMessage = (e) => {
        e.preventDefault();

        if(input)
        {db.collection('rooms').doc(RoomId).collection('messages').add({
            name: user.displayName,
            description:user.email,
            message: input,
            photoUrl: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        chatRef?.current.scrollIntoView({behavior: "smooth"});
        setInput('');}
    };

  return (
    <ChatInputContainer>
        <form >
            <input type="text" 
            value={input}
            onChange={ e => setInput(e.target.value)} 
            placeholder={`Message #${roomId?.data().name}`}/>
            <Button type='submit' onClick={sendMessage}>
                <SendRoundedIcon   className='icon'/>
            </Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
    
    
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
     form{
        width: 78%;
        height: 5rem;
        border: 1px solid gray;
        background-color: rgba(53, 55, 59, 1);
        border-radius: 5px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: fixed;
        bottom: 20px;
        
    }
    input{
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        padding:30px 20px !important;
        color: lightgray;
        font-size: 16px;
        word-wrap: break-word;
        
        
    }
    .icon{
        color: gray;
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
    }


`;