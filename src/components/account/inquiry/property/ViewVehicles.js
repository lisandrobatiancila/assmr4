import { useEffect, useState } from 'react'
import { noCredAPI, SERVER_PORT } from '../../../../routes/api/apiURL'
import Loading from '../../../actionMessages/Loading'
import viewvehicleStyle from './ViewVehicles.module.css'
import { useNavigate } from 'react-router-dom'
import LoadImage from '../../wrapper/LoadImage'
import Card from '../../wrapper/Card'

const ViewVehicles = ({ context })=>{
    const { onOpenModal } = context
    const [isLoading, setIsLoading] = useState(true)
    const [vehicleLists, setVehicleLists] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        noCredAPI.get('/properties/property-for-assumption/vehicles/NA')
            .then(response => {
                setVehicleLists(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                if(!err?.response)
                    setIsLoading(false)
            })
        return () =>{
            setIsLoading(false)
        }
    }, [])
    return (
        <div className={ viewvehicleStyle.vehicle_container }>
            {
                isLoading?<Loading message = "fetching vehicles..." width="50px" height="50px" />
                    :vehicleLists.length === 0?"no content"
                    :
                <>
                    <div style={{padding: "5px"}}>
                    {
                        vehicleLists.map(vehicleList =>{
                            return (
                                <Card key={vehicleList.vehicle[0]._id}>
                                    <div>
                                        <div>
                                            <LoadImage image={`http://localhost:${SERVER_PORT}/${vehicleList.vehicle[0].vimg.images[0]}`} />
                                            <button onClick={ () => onOpenModal(vehicleList.vehicle[0].property_id) }>assume</button>
                                        </div>
                                        <div>
                                            <label>owner: { vehicleList.vehicle[0].vehicle_owner }</label>
                                            <label>brand: { vehicleList.vehicle[0].vehicle_name }</label>
                                            <label>model: { vehicleList.vehicle[0].vehicle_model }</label>
                                            <label>location: { vehicleList.vehicle[0].vehicle_location }</label>
                                            <label>installmentpaid: { vehicleList.vehicle[0].vehicle_installmentpaid }</label>
                                            <label>installmentduration: { vehicleList.vehicle[0].vehicle_installmentduration }</label>
                                            <label>delinquent: { vehicleList.vehicle[0].delinquent }</label>
                                            <label>descriptions: { vehicleList.vehicle[0].description }</label>
                                            <div>
                                                <button onClick={ ()=> navigate(vehicleList.vehicle[0]._id)}>view property</button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                    </div>
                </>
            }
        </div>
    )
}

export default ViewVehicles