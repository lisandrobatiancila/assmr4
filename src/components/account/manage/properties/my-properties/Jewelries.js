import jewelryStyle from './Jewelries.module.css'
import ThreeDots from '../../../../3-dots/ThreeDots'
import { SERVER, SERVER_PORT } from '../../../../../routes/api/apiURL'

function Jewleries({ properties, toggleModal, setForDropActionState }) {
    console.log(properties)
    return (
        <div style={{marginTop: "10px"}}>
            {
                properties.map(jewelry => 
                    <div key={jewelry._id} className = { jewelryStyle.jewelry_container }>
                        <div className={ jewelryStyle.jewelry_header }>{/* the jewelry images here*/ }
                            <img src={`${SERVER.URI}${SERVER_PORT}/${jewelry?.jinfo?.images[0]}`} />
                        </div>
                        <ThreeDots params = {jewelry} toggleModal = { toggleModal } 
                            setForDropActionState = { setForDropActionState } />
                        <div className={ jewelryStyle.jewelry_body }>
                            <p>owner: {jewelry?.jinfo.jewelry_owner}</p>
                            <p>jewelry: {jewelry?.jinfo.jewelry_name}</p>
                            <p>type: {jewelry?.jinfo.jewelry_type}</p>
                            <p>installment paid: {jewelry?.jinfo?.jewelry_installmentpaid}</p>
                            <p>delinquent: {jewelry?.jinfo?.jewelry_delinquent}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Jewleries