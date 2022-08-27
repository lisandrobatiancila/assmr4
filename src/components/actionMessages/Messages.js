import messageStyle from './Messages.module.css'

const Messages = ({ type, message })=>{
    //type can be => error, success
    return(
        <>
            {
                type === "error"?<span className={ messageStyle.error_fields }>{ message }</span>:"pass"
            }
        </>
    )
}

export default Messages