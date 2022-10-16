import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { withCredAPI } from '../../../../../routes/api/apiURL'
import { useAuth } from "../../../../../hooks/context/useAuth"
import Error from "../../../../actionMessages/Error"
import mycertainStyle from './MyCertainProperties.module.css'
import Slider from "../../../../slider/Slider"

function MyCertainProperties() {
    const navigate = useNavigate()
    const urlParams = useParams()
    const auth = useAuth()
    const [vehicleAttributes, setVehicleAttributes] = useState([]) // THIS SHOULD BE NAME AS propertyATTRIBUTES

    const [updateResponse, setUpdateResponse] = useState(null)
    const [certainProperty, setCertainProperty] = useState(null)

    useEffect(() => {
        withCredAPI.get(`/properties/certain-property/${urlParams.type}/${urlParams.id}`)
            .then(response => {
                setCertainProperty(response?.data)
                console.log(response.data)
                switch(response?.data?.propertyType) {
                    case 'vehicle':
                        setVehicleAttributes([
                            {key: response?.data?.vehicle_owner, isChanged: false},
                            {key: response?.data?.contactno, isChanged: false},
                            {key: response?.data?.vehicle_location, isChanged: false},
                            {key: response?.data?.vehicle_name, isChanged: false},
                            {key: response?.data?.vehicle_model, isChanged: false},
                            {key: response?.data?.vehicle_installmentpaid, isChanged: false},
                            {key: response?.data?.vehicle_installmentduration, isChanged: false},
                            {key: response?.data?.delinquent, isChanged: false},
                            {key: response?.data?.description, isChanged: false},
                        ])
                    break;
                    case 'jewelry':
                        setVehicleAttributes([
                            {key: response?.data?.jewelry_owner, isChanged: false},
                            {key: response?.data?.jewelry_contactno, isChanged: false},
                            {key: response?.data?.jewelry_location, isChanged: false},
                            {key: response?.data?.jewelry_name, isChanged: false},
                            {key: response?.data?.jewelry_type, isChanged: false},
                            {key: response?.data?.jewelry_installmentpaid, isChanged: false},
                            {key: response?.data?.jewelry_installmentduration, isChanged: false},
                            {key: response?.data?.jewelry_delinquent, isChanged: false},
                            {key: response?.data?.jewelry_description, isChanged: false},
                        ])
                        console.log(vehicleAttributes)
                    break;
                    case 'realestate':
                    break;
                    default:
                        console.log('no propertyType')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const saveUpdate = (propType, params) => {
        const VEHICLE_ID = urlParams.id
        params = {
            propID: VEHICLE_ID,
            propType,
            payloads: params
        }
        withCredAPI.patch(`/main/posted-properties/${propType}`, params, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.auth?.accessToken}`
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response?.data)
                if(!response?.data?.has_error)
                    alert(response?.data?.message)
                setUpdateResponse(Object.values(response?.data).length > 0 && response?.data?.has_error? response?.data: null)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const backButton = () => {
        navigate(-1)
    }
    
    return (
        <div style={{padding: "10px", height: "100px"}}>
            <button
                onClick={ backButton }>back
            </button>
            {
                certainProperty && urlParams.actionType === 'view'?
                urlParams?.type === 'vehicle'?
                <div className={ mycertainStyle.certainprop_card_container }>
                    <div className="certain_head">
                        {/* <div className="">
                            {
                                certainProperty?.vimg?.images.map((img, i) =>
                                    <img key={i} src={ `${SERVER.URI}${SERVER_PORT}/${img}` } width="100px" height="100px" />
                                )
                            }
                        </div> */}
                        <Slider images={certainProperty?.vimg?.images} />
                    </div>
                    <div className={ mycertainStyle.certain_body }>
                        <p>owner: {certainProperty.vehicle_owner}</p>
                        <p>contact: {certainProperty.contactno}</p>
                        <p>location: {certainProperty.vehicle_location}</p>
                        <p>name: {certainProperty.vehicle_name}</p>
                        <p>model: {certainProperty.vehicle_model}</p>
                        <p>installmen paid: $ {certainProperty.vehicle_installmentpaid}</p>
                        <p>installment duration: {certainProperty.vehicle_installmentduration}</p>
                        <p>delinquent: {certainProperty.delinquent}</p>
                        <p>description: {certainProperty.description}</p>
                    </div>
                </div>
                :
                urlParams?.type === 'jewelry'?
                <div className={ mycertainStyle.certainprop_card_container }>
                    <div className="certain_head">
                        {/* <div className="">
                            {
                                certainProperty?.vimg?.images.map((img, i) =>
                                    <img key={i} src={ `${SERVER.URI}${SERVER_PORT}/${img}` } width="100px" height="100px" />
                                )
                            }
                        </div> */}
                        <Slider images={certainProperty?.images} />
                    </div>
                    <div className={ mycertainStyle.certain_body }>
                        <p>owner: {certainProperty.jewelry_owner}</p>
                        <p>contact: {certainProperty.jewelry_contactno}</p>
                        <p>location: {certainProperty.jewelry_location}</p>
                        <p>name: {certainProperty.jewelry_name}</p>
                        <p>type: {certainProperty.jewelry_type}</p>
                        <p>installmen paid: $ {certainProperty.jewelry_installmentpaid}</p>
                        <p>installment duration: {certainProperty.jewelry_installmentduration}</p>
                        <p>delinquent: {certainProperty.jewelry_delinquent}</p>
                        <p>description: {certainProperty.jewelry_description}</p>
                    </div>
                </div>
                :
                "no content"
                // FOR VIEWING ONLY
                :
                certainProperty && urlParams.actionType === "update"?
                urlParams?.type === 'vehicle'?
                <div className={ mycertainStyle.certainprop_card_container }>
                    <div className="certain_head">
                        {/* <div className="">
                            {
                                certainProperty?.vimg?.images.map((img, i) =>
                                    <img key={i} src={ `${SERVER.URI}${SERVER_PORT}/${img}` } width="100px" height="100px" />
                                )
                            }
                        </div> */}
                        <Slider images={certainProperty?.vimg?.images} />
                    </div>
                    {
                        updateResponse?
                        <div style={{marginBottom: '15px'}}>
                            <Error 
                                errorMessage={{message: updateResponse? updateResponse?.has_error && updateResponse?.field:'',
                                color: '#00a824'
                                }} />
                        </div>
                    :""
                    }
                    <div className={ mycertainStyle.certain_body }>
                        <label>owner: </label>
                        <input type="text" name="owner" 
                            value={ vehicleAttributes.length > 0? vehicleAttributes[0]['key']:'' } 
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[0] = {key: e.target.value, field: 'owner', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Owner" />
                        <label>contact: </label>
                        <input type="text" name="contact" 
                            value={ vehicleAttributes.length > 0? vehicleAttributes[1]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[1] = {key: e.target.value, field: 'contact', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Contact" />
                        <label>location: </label>
                        <input type="text" name="location"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[2]['key']:''}
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[2] = {key: e.target.value, field: 'location', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="province, city, barangay" />
                        <label>name: </label>
                        <input type="text" name="name"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[3]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[3] = {key: e.target.value, field: 'name', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="Name" />
                        <label>model: </label>
                        <input type="text" name="model"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[4]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[4] = {key: e.target.value, field: 'model', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="Model" />
                        <label>installmentpaid: </label>
                        <input type="text" name="installmentpaid"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[5]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[5] = {key: e.target.value, field: 'installmentpaid', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Installment paid" />
                        <label>installmentduration: </label>
                        <input type="text" name="installmentduration"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[6]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[6] = {key: e.target.value, field: 'installmentduration', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Installment duration" />
                        <label>delinquent: </label>
                        <input type="text" name="delinquent"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[7]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[7] = {key: e.target.value, field: 'delinquent', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Delinquent" />
                        <label>description: </label>
                        <input type="text" name="description"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[8]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[8] = {key: e.target.value, field: 'description', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Description" />
                        <button
                            onClick={ () => saveUpdate('vehicle', vehicleAttributes) }>save updates</button>
                        <button>reset updates</button>
                    </div>
                </div>
                :
                urlParams?.type === 'jewelry'?
                <div className={ mycertainStyle.certainprop_card_container }>
                    <div className="certain_head">
                        {/* <div className="">
                            {
                                certainProperty?.vimg?.images.map((img, i) =>
                                    <img key={i} src={ `${SERVER.URI}${SERVER_PORT}/${img}` } width="100px" height="100px" />
                                )
                            }
                        </div> */}
                        <Slider images={certainProperty?.images} />
                    </div>
                    {
                        updateResponse?
                        <div style={{marginBottom: '15px'}}>
                            <Error 
                                errorMessage={{message: updateResponse? updateResponse?.has_error && updateResponse?.field:'',
                                color: '#00a824'
                                }} />
                        </div>
                    :""
                    }
                    <div className={ mycertainStyle.certain_body }>
                        <label>owner: </label>
                        <input type="text" name="owner" 
                            value={ vehicleAttributes.length > 0? vehicleAttributes[0]['key']:'' } 
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[0] = {key: e.target.value, field: 'owner', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Owner" />
                        <label>contact: </label>
                        <input type="text" name="contact" 
                            value={ vehicleAttributes.length > 0? vehicleAttributes[1]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[1] = {key: e.target.value, field: 'contact', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Contact" />
                        <label>location: </label>
                        <input type="text" name="location"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[2]['key']:''}
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[2] = {key: e.target.value, field: 'location', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="province, city, barangay" />
                        <label>name: </label>
                        <input type="text" name="name"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[3]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[3] = {key: e.target.value, field: 'name', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="Name" />
                        <label>tpe: </label>
                        <input type="text" name="model"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[4]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[4] = {key: e.target.value, field: 'model', isChanged: true}
                                    return [...sva]
                                })
                            } }
                            placeholder="Model" />
                        <label>installmentpaid: </label>
                        <input type="text" name="installmentpaid"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[5]['key']:'' }
                            onChange = { (e) => {
                                setUpdateResponse(null)
                                setVehicleAttributes(sva => {
                                    sva[5] = {key: e.target.value, field: 'installmentpaid', isChanged: true}
                                    return [...sva]
                                })
                            }
                            }
                            placeholder="Installment paid" />
                        <label>installmentduration: </label>
                        <input type="text" name="installmentduration"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[6]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[6] = {key: e.target.value, field: 'installmentduration', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Installment duration" />
                        <label>delinquent: </label>
                        <input type="text" name="delinquent"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[7]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[7] = {key: e.target.value, field: 'delinquent', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Delinquent" />
                        <label>description: </label>
                        <input type="text" name="description"
                            value={ vehicleAttributes.length > 0? vehicleAttributes[8]['key']:'' }
                            onChange = { (e) => {
                                    setUpdateResponse(null)
                                    setVehicleAttributes(sva => {
                                    sva[8] = {key: e.target.value, field: 'description', isChanged: true}
                                    return [...sva]
                                })
                            } 
                            }
                            placeholder="Description" />
                        <button
                            onClick={ () => saveUpdate('jewelry', vehicleAttributes) }>save updates</button>
                        <button>reset updates</button>
                    </div>
                </div>
                :
                "no content"
                :
                "no content to show"
                // FOR UPDATING ONLY
            }
        </div>
    )
}

export default MyCertainProperties