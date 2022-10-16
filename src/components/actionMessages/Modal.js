import modalStyle from './Modal.module.css'

function Modal({ toggleModal, children }) {
    console.log(children)
    return(
        <div className={ modalStyle.modal_container }>
            <div className={ modalStyle.modal_card }>
                <button onClick={ toggleModal }>&times;</button>
                <div className= { modalStyle.modal_content }>
                    <div className={ modalStyle.modal_header }>
                        {children[0]}
                    </div>
                    <div className= { modalStyle.modal_body }>
                        {children[1]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal