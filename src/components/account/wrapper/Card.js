import style from './Card.module.css'

const Card = ({ children }) =>{
    return(
        <>
            {
                children?
                <div className={ style.card_content } style={{width: "35%"}}>
                    <div className={ style.card_header}>
                        {children.props.children[0]}
                    </div>
                    <div className={ style.card_body}>
                        {children.props.children[1]}
                    </div>
                </div>
                : "we have nothing to display" // if card has no children go here
            }
        </>
    )
}

export default Card