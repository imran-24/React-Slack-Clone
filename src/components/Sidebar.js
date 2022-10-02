import React, { useEffect, useState } from 'react'

import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { InboxRounded } from '@material-ui/icons';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

function Sidebar() {

  const [channels, loading, errors] = useCollection(db.collection('rooms'));
  const [channel, setChannel] = useState([]);
  useEffect( () => {
    db.collection('rooms')
    .onSnapshot( snapshot => (
        setChannel(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
    ))
  }, []);
  return (
    <SidebarContainer>
        <SidebarHeader>
            <h2>React-learners</h2>
            <CreateSharpIcon className='icon edit'/>
        </SidebarHeader>
        
        <SidebarOption Icon={CommentRoundedIcon} title='Threads' />
        <SidebarOption Icon={InboxRounded} title='Mentions & reactions' />
        <SidebarOption Icon={DraftsRoundedIcon} title='Saved items' />
        <SidebarOption Icon={BookmarkBorderRoundedIcon} title='Channnel browser' />
        <SidebarOption Icon={PeopleRoundedIcon} title='People & user groups' />
        <SidebarOption Icon={AppsRoundedIcon} title='App' />
        <SidebarOption Icon={FileCopyRoundedIcon} title='File browser' />
        <SidebarOption Icon={ExpandLessRoundedIcon} title='Show more' />
        <hr />
        <SidebarOption Icon={ExpandMoreRoundedIcon} title='Channels' />
        <hr />
        <SidebarOption Icon={AddBoxRoundedIcon} title='Add Channel' addChannnelOption />
        
        { channels?.docs.map( doc => (

            <SidebarOption 
                id={doc.id} 
                key={doc.id} 
                title={doc.data().name} />            

        ))}

        {/* {
            channel.map(({id, data: {name}}) => {
                <SidebarOption
                    key={id}
                    title = {name} />
               
            } )
        } */}

        


    </SidebarContainer>
  )
}

export default Sidebar;

const SidebarContainer = styled.div`
        background-color: var(--slack-color);
        min-height: calc(100vh - 3rem);
        width: 20%;
        position: fixed;
        top:3rem;
        > hr {
            border: none;
            margin: 10px 0 !important;
            border-bottom: .5px solid rgb(63, 63, 63) !important;
        }
        .icon{
        color: darkgray;
        font-size: 30px;
        font-weight: 100 !important;
        padding: 4px !important;
    }
`;

const SidebarHeader = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 10px 34px !important;
    border-bottom: 1px solid rgb(63, 63, 63);
    > .edit{
        color: var(--slack-color);
        background-color: white;
        border-radius: 50%;
    }
    
`;