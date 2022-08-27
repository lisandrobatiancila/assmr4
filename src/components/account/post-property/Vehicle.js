import vehicleStyle from './Vehicle.module.css'
import { useState, useRef, useEffect } from 'react'
import Messages from '../../actionMessages/Messages'
import { noCredAPI } from '../../../routes/api/apiURL'
import Error from '../../actionMessages/Error'

const Vehicle = ()=>{
    const [vehicleOwner, setVehicleOwner] = useState('')
    const [vehicleContactno, setVehicleContactno] = useState('')
    const [vehicleLocation, setVehicleLocation] = useState('')
    const [vehicleName, setVehicleName] = useState('')
    const [vehicleModel, setVehicleModel] = useState('')
    const [vehicleInstallmentpaid, setVehicleInstallmentpaid] = useState('')
    const [vehicleInstallmentduration, setVehicleInstallmentduration] = useState('')
    const [vehicleDelinquent, setVehicleDelinquent] = useState('')
    const [vehicleDescription, setVehicleDescription] = useState('')
    const [files, setFiles] = useState(null)
    const [errTypes, setErrTypes] = useState(null)
    const [isChanged, setIsChanged] = useState(false)

    const submitVehicleProperty = (e)=>{
        e.preventDefault()

        var form = new FormData()
        
        form.append("propertyType", "vehicle")
        form.append('vehicleOwner', vehicleOwner)
        form.append('vehicleContactno', vehicleContactno)
        form.append('vehicleLocation', vehicleLocation)
        form.append('vehicleName', vehicleName)
        form.append('vehicleModel', vehicleModel)
        form.append('vehicleInstallmentpaid', vehicleInstallmentpaid)
        form.append('vehicleInstallmentduration', vehicleInstallmentduration)
        form.append('vehicleDelinquent', vehicleDelinquent)
        form.append('vehicleDescription', vehicleDescription)
        form.append("fileCount", files?files.length : 0)
        if(!files)
            form.append('images', {})//means error
        else{
            for(let file of files){
                form.append('images', file)//means fine
            }
        }
        noCredAPI.post('/main/post/vehicle',
            form,
            {
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true
            }
        ).then(response => {
            console.log(response)
            setErrTypes(response.data)
            setFiles(null)
            setIsChanged(true)
            form = null
        })
        .catch(err => console.log(err))

    }
    const resetVehicleProperty = (e)=>{
        e.preventDefault()
        console.log('reset')
        setVehicleName('');setVehicleLocation('');setVehicleModel('')
        setVehicleOwner('');setVehicleInstallmentpaid('');setVehicleInstallmentduration('')
        setVehicleDelinquent('');setVehicleDescription('')
    }
    
    useEffect(()=>{
        setIsChanged(false)
    }, [isChanged])
    return(
        <>
            <section className={ vehicleStyle.vehicle_container }>
                { /successfull!/.test(errTypes?.message) ? 
                    <div style={{marginBottom: "20px"}}><Error errorMessage={{message: errTypes.has_error, color: "#00a824" }} /></div>
                    : ""}
                <form onSubmit = { submitVehicleProperty }>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle owner
                            {errTypes?.vo?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleOwner" value={ vehicleOwner }
                           onChange = { (e)=> {
                                setErrTypes({...errTypes, vo: false})
                                setVehicleOwner(e.target.value)
                           } }
                           placeholder="vehicle owner" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>contactno. #
                            {errTypes?.vc?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleContactno" value={ vehicleContactno }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vc: false})
                                setVehicleContactno(e.target.value)
                            } }
                            placeholder="contactno. #" />
                    </div>
                    
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle location
                            {errTypes?.vl?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleLocation" value={ vehicleLocation }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vl: false})
                                setVehicleLocation(e.target.value)
                            } }
                            placeholder="vehicle location" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle name
                            {errTypes?.vn?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleName" value={ vehicleName }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vn: false})
                                setVehicleName(e.target.value)
                            } }
                            placeholder="vehicle name" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle model
                            {errTypes?.vm?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleModel" value={ vehicleModel }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vm: false})
                                setVehicleModel(e.target.value)
                            } }
                            placeholder="vehicle model" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle installmentpaid
                            {errTypes?.vip?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleInstallmentpaid" value={ vehicleInstallmentpaid }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vip: false})
                                setVehicleInstallmentpaid(e.target.value)
                            } }
                            placeholder="vehicle installmentpaid" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle installmentduration
                            {errTypes?.vid?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleInstallmentduration" value={ vehicleInstallmentduration }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vid: false})
                                setVehicleInstallmentduration(e.target.value)
                            } }
                            placeholder="vehicle installmentduration" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle delinquent
                            {errTypes?.vdel?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="veicleDelinquent" value = { vehicleDelinquent }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vdel: false})
                                setVehicleDelinquent(e.target.value)
                            } }
                            placeholder="vehicle delinquent" />
                    </div>
                    <div className={ vehicleStyle.vehicle_content }>
                        <label>vehicle description
                            {errTypes?.vdesc?<Messages type="error" message ="empty fields" />:""}
                        </label>
                        <input type="text" name="vehicleDescription" value = { vehicleDescription }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vdesc: false})
                                setVehicleDescription(e.target.value)
                            } }
                            placeholder="vehicle description" />
                    </div>
                    <div>
                        <label>upload at least 6 images
                            {errTypes?.vimg?<Messages type="error" 
                                message={`${errTypes.vimg_mssg}`} />: ""}
                        {/* please pick an image: you pick ${!files?'0':files.length} out of 6 */}
                        </label>
                        <input type="file" name="vehicle_images" multiple = { true }
                            onChange = { (e)=> {
                                setErrTypes({...errTypes, vimg: false})
                                setFiles(e.target.files)
                            } } />
                    </div>
                    <div className={ vehicleStyle.vehicle_buttons }>
                        <button>reset</button>
                        <button>submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Vehicle