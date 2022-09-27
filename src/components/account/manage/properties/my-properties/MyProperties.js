import { useEffect, useState } from "react"
import { noCredAPI } from '../../../../../routes/api/apiURL'
import { useAuth } from '../../../../../hooks/context/useAuth'
import Loading from "../../../../actionMessages/Loading"
import VehicleProperties from "./VehicleProperties"
import myPropertiesStyle from './MyProperties.module.css'

const MyProperties = () =>{
    const auth = useAuth()
    const [propertyType, setPropertyType] = useState('vehicles')
    const [otherType, setOtherType] = useState('__')
    const [isLoading, setIsLoading] = useState(true)
    const [properties, setProperties] = useState([])

    useEffect(() => {
        noCredAPI.get(`/main/posted-properties/all-properties/${propertyType}/${otherType}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth?.auth?.accessToken}`
            }
        })
            .then(response => {
                console.log(response)
                setProperties(response?.data)
                setIsLoading(!isLoading)
            })
            .catch(err => {
                console.log(err)
            })
    }, [propertyType, otherType])
    return(
        <>
            <div>
                <div className={ myPropertiesStyle.posted_prop_title }>your posted properties</div>
                <div className={ myPropertiesStyle.current_view_prop }>
                    <div className={ myPropertiesStyle.vehicles_prop }>vehicles</div>
                    <div className={ myPropertiesStyle.realestates_prop }>realestates</div>
                    <div className={ myPropertiesStyle.jewelries_prop }>jewelries</div>
                </div>
                {
                    isLoading?<Loading message="fetching..." width="20px" height="20px" />:
                    <div className={ myPropertiesStyle.display_properties }>
                        {
                            /ve|cle|le/.test(propertyType)?<VehicleProperties properties= { properties } />:""
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default MyProperties