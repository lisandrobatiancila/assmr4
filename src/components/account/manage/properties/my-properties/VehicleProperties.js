import vehiclePropertiesStyle from './VehicleProperties.module.css'
import { SERVER, SERVER_PORT } from '../../../../../routes/api/apiURL'
import ThreeDots from '../../../../3-dots/ThreeDots'

function VehicleProperties({ properties, toggleModal, openModal, setForDropActionState }) {

    return (
        <>
            <div style={{marginTop: "10px"}}>
                {
                    properties.map(vehicle => 
                        <div key={vehicle._id} className = { vehiclePropertiesStyle.vehicle_container }>
                            <div className={ vehiclePropertiesStyle.vehicle_header }>{/* the vehicle images here*/ }
                                <img src={`${SERVER.URI}${SERVER_PORT}/${vehicle?.vehicle.vimg.images[0]}`} />
                            </div>
                            <ThreeDots params = {vehicle} toggleModal = { toggleModal } 
                                setForDropActionState = { setForDropActionState } />

                            <div className={ vehiclePropertiesStyle.vehicle_body }>
                                <p>owner: {vehicle?.vehicle.vehicle_owner}</p>
                                <p>vehicle: {vehicle?.vehicle.vehicle_name}</p>
                                <p>model: {vehicle?.vehicle.vehicle_model}</p>
                                <p>installment paid: {vehicle?.vehicle.vehicle_installmentpaid}</p>
                                <p>delinquent: {vehicle?.vehicle.delinquent}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default VehicleProperties