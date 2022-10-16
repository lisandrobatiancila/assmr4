import { useEffect, useState } from "react"
import { noCredAPI, withCredAPI } from '../../../../../routes/api/apiURL'
import { SERVER, SERVER_PORT } from "../../../../../routes/api/apiURL"
import { useAuth } from '../../../../../hooks/context/useAuth'
import Loading from "../../../../actionMessages/Loading"
import VehicleProperties from "./VehicleProperties"
import myPropertiesStyle from './MyProperties.module.css'
import Modal from "../../../../actionMessages/Modal"
import Jewleries from "./Jewelries"

/*
THERE'S A BUG IN DROPPING OF PROPERTY, WE ALREADY KNOW ABOUT IT AND JUST DON'T GET SHOCK !!
*/
const MyProperties = () =>{
    const auth = useAuth()
    const [propertyType, setPropertyType] = useState('vehicles')
    const [otherType, setOtherType] = useState('others')
    const [isLoading, setIsLoading] = useState(true)
    const [properties, setProperties] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [somethingDropped, setSomethingDropped] = useState(false); // trigger refresh if something was dropped

    const [forDropActionState, setForDropActionState] = useState({
        image: '',
        id: ''
    })

    const [activeProperty, setActiveProperty] = useState({
        'property': 'vehicle', active: true
    })

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
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [propertyType, otherType, activeProperty, somethingDropped])

    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const confirmDropProperty = (params) => {
        withCredAPI.delete(`/main/posted-properties/drop-property/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.auth?.accessToken}`
                },
                withCredentials: true
            }
        )
            .then(response => {
                if(response?.data)
                    alert(response?.data?.message)
                setOpenModal(!openModal)
                setSomethingDropped(true)
                setIsLoading(true)
            })
            .catch(err => console.log(err))
    }
    return(
        <>
            <div>
                <div className={ myPropertiesStyle.posted_prop_title }>your posted properties</div>
                <div className={ myPropertiesStyle.current_view_prop }>
                    <div className={ [
                        myPropertiesStyle.vehicles_prop, 
                        activeProperty.property === 'vehicle'?myPropertiesStyle.active:''].join(' ') 
                        }
                        onClick = { () => {
                            if(isLoading)
                                return
                            setPropertyType('vehicles')
                            setActiveProperty({'property': 'vehicle', active: true})
                            setIsLoading(true)
                        } }
                        >vehicles</div>
                    <div className={ myPropertiesStyle.realestates_prop }>realestates</div>
                    <div className={ [
                        myPropertiesStyle.jewelries_prop,
                        activeProperty.property === 'jewelry'?myPropertiesStyle.active:''].join(' ')
                        }
                        onClick = { () => {
                            if(isLoading)
                                return
                            setPropertyType('jewelries')
                            setActiveProperty({'property': 'jewelry', active: true})
                            setIsLoading(true)
                        } }>jewelries</div>
                </div>
                {
                    isLoading?<Loading message="fetching..." width="20px" height="20px" />:
                    <div className={ myPropertiesStyle.display_properties }>
                        {
                            properties.length > 0 && /ve|cle|le/.test(propertyType)? <VehicleProperties 
                                properties= { properties } toggleModal = { toggleModal }
                                setForDropActionState = { setForDropActionState } />
                            :
                            properties.length > 0 && /jew|el|ry|/.test(propertyType)? <Jewleries
                                properties = { properties } toggleModal = { toggleModal }
                                setForDropActionState = { setForDropActionState } />
                            :
                            <div style={{marginLeft: '20px'}}>
                                <h3>nothing to display</h3>
                            </div>
                        }
                    </div>
                }
            </div>
            {
                openModal?<Modal toggleModal = { toggleModal }>
                    <div>
                        <img src={`${SERVER.URI}${SERVER_PORT}/${forDropActionState.image}`}
                            width="200px" height="250px" />
                    </div>
                    <div>
                        <p>{ forDropActionState.id }</p>
                        <h3>are you sure you want to drop this property?</h3>
                        <button
                            onClick={ () => confirmDropProperty(forDropActionState) }>Confirm</button>
                        <button
                            onClick={ toggleModal }>Cancel</button>
                    </div>
                </Modal>:''
            }
        </>
    )
}

export default MyProperties