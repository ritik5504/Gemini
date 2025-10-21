import React, { useContext, useState } from 'react'
import './side.css'
import { assets } from '../../assets/assets/assets'
import { Context } from '../../context/context';

const side = () => {
    const [extended,setExtended]=useState(false);

    const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)
    const { startListening, handleImageUpload } = useContext(Context);


    const loadPrompt=async (prompt)=> {
        setRecentPrompt(prompt)
       await onSent(prompt)
        
    }






  return (
    <div className='sidebar'>
    <div className="top">
        <img onClick={()=> setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="menu" />
        <div onClick={()=>newChat()} className="newchat">
            <img src={assets.plus_icon} alt=" " />
            {extended?<p> New Chat</p>: null}
        </div>
        {extended?
        <div className="recent">
            <p className='recent-recent'> Recent</p>
            {prevPrompts.map((item,index)=>{
                return (
                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                <img src={ assets.message_icon}alt="" />
                <p>{item.slice(0,18)}...</p>
            </div>

                )
            })}
            
        </div>
        : null
        
    }


        
        
  


    </div>
    <div className="bottom">
        <div className="botton-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended? <p>Help</p>: null} 
        </div>

         <div className="botton-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>: null}
        </div>

         <div className="botton-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>: null}
        </div>

    </div>
    </div>

  )
}

export default side