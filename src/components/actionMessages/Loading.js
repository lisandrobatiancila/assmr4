import loadingStyle from './Loading.module.css'

const Loading = ({ message, width, height })=>{
    return(
        <>
            <div className={ loadingStyle.loading_container } style={{width: width, height: height}}>
                <div className={ loadingStyle.loading_content }>
                </div>
            </div>
            <p>{ message }</p>
        </>
    )
}

export default Loading