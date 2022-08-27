import style from './ChatMessage.module.css'

const ChatMessage = ({ message, avatar }) =>{
    return (
        <>
            {
                message?.status === 'active'? //means go right
                    <div className={ style.chat_message_right_container }>
                        <div className={ style.chat_message_right_content }>
                            <img src={ avatar } width={"50px"} height={"50px"} className={ style.avatar_active } />
                            <span className={ style.active_message }>{ message.message }</span>
                        </div>
                    </div>
                    : //means go left
                    <div className={ style.chat_message_left_container}>
                        <div className={ style.chat_message_left_content}>
                            <img src={ avatar } width={"50px"} height={"50px"} className={ style.avatar_passive } />
                            <span className={ style.passive_message }>{ message.message }</span>
                        </div>
                    </div>
            }
        </>
    )
}

export default ChatMessage