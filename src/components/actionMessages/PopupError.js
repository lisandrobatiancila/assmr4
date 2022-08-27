const PopupError = ({ params }) =>{
    const {showError, setShowError } = params
    
    return(
        <div className="error_popup" style={{
            display: showError?.isError?"block":"none",
            backgroundColor: showError?.isError?'#eb3e0a':''
            }}>
             <div className="error_popup_header">
                 <h3>oops <span onClick={() => {
                     setShowError({message: '', isError: false})
                 }}>&times;</span></h3>
             </div>
             <div className="error_popup_body">
                 { showError?.message }
             </div>
        </div>
    )
}

export default PopupError