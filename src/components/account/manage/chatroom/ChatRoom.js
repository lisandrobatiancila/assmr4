import { useState, useEffect } from 'react'
import { BASE_URL, withCredAPI } from '../../../../routes/api/apiURL'
import { useAuth } from '../../../../hooks/context/useAuth'
import style from './ChatRoom.module.css'
import avatar from '../../../../staticData/images/user.png'
import ChatMessage from '../../wrapper/ChatMessage'
import axios from 'axios'
import { io } from 'socket.io-client'

const ChatRoom = ()=> {
    const [recentChatWithUsers, setRecentChatWithUsers] = useState([])
    const auth = useAuth()
    const [composedMessage, setComposedMessage] = useState('')
    const [receiverID, setReceiverID] = useState('')
    const [senderID, setSenderID] = useState('')
    const [ourMessages, setOurMessages] = useState([])

    useEffect(() =>{
        const controller = new AbortController()
        const socket = io('http://localhost:1000')
        socket.emit('recentChatsWith', ({email: auth.auth.account_email}))
        socket.on('recentChatsWith', (messRec)=> {
            console.log(messRec)
            setRecentChatWithUsers(messRec)
        })
    }, [])

    const iwantToChatWith = (user)=>{
        const { sender_id, receiver_id } = user
        withCredAPI.get(`/main/chatrooms/user-want-to-chat-with/${sender_id}/${receiver_id}`)
            .then(response => {
                setOurMessages(response.data)
                setReceiverID(response.data[0].receiver_id)
                setSenderID(response.data[0].sender_id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const sendMessage = (e)=>{
        e.preventDefault()
    
        // withCredAPI.post('/account/users/manage/chatroom/send-message-to', {composedMessage, senderID, receiverID})
        //     .then(response => {
        //         console.log(response)
        //         setComposedMessage('')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    return(
        <>
            <div className={ style.chat_room_container }>
                <section className={ style.chat_room }>
                    <form onSubmit={ sendMessage }>
                        <div className={ style.chat_room_header }>
                            <h5>chat room: support</h5>
                        </div>
                        <div className={ style.chat_room_body }>
                            {
                                ourMessages.map(message => {
                                    return <ChatMessage key={ message._id } message={ message } avatar={ avatar } />
                                })
                            }
                        </div>
                        <div className={ style.chat_room_actions }>
                            <input type="text" placeholder="message..." name="composedMessage" value={ composedMessage }
                                onChange = {(e) => setComposedMessage(e.target.value) } autoComplete="off" />
                            <input type="submit" value=">>" />
                        </div>
                    </form>
                </section>
                <section className={ style.chat_buddy }>
                    <div className={ style.chat_buddy_header }>
                        <h5>recent chats</h5>
                    </div>
                    <div className={ style.chat_buddy_body }>
                        <div className={ style.chatted_users_container }>
                            {
                                recentChatWithUsers.length? recentChatWithUsers.map(recentchat =>{
                                    return(
                                        <div key={recentchat._id} className={style.chatted_users_content }
                                            onClick={ ()=>iwantToChatWith(recentchat) }>
                                            <img src={ avatar } />
                                            <div className={ style.message_container }>
                                                <p>{recentchat.message_sender}</p>
                                                <small className={ style.message }>{ recentchat.message }</small>
                                                <small>{ recentchat.textType }</small>
                                                <small><i>{ recentchat.message_date }</i></small>
                                            </div>
                                        </div>
                                    )
                                })
                                : "no recent activities..."
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ChatRoom