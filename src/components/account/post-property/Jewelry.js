import { useState } from 'react'
import jewelryStyle from './Jewelry.module.css'
import { noCredAPI } from '../../../routes/api/apiURL'
import Error from '../../actionMessages/Error'
import Messages from '../../actionMessages/Messages'

const Jewelry = ()=>{
    const [jewelryOwner, setJewelryOwner] = useState('')
    const [jewelryName, setJewelryName] = useState('')
    const [jewelryModel, setJewelryModel] = useState('')
    const [jewelryLocation, setJewelryLocation] = useState('')
    const [jewelryInstallmentpaid, setJewelryInstallmentpaid] = useState('')
    const [jewelryInstallmentduration, setJewelryInstallmentduration] = useState('')
    const [jewelryDelinquent, setJewelryDelinquent] = useState('')
    const [jewelryDescriptions, setJewelryDescriptions] = useState('')
    const [hasError, setHasError] = useState(null)
    const [jewelryFiles, setJewelryFiles] = useState(null)

    const submitJewelryProperty = (e)=>{
        e.preventDefault()

        var form = new FormData()
        form.append("propertyType", "jewelry")
        form.append("jewelryOwner", jewelryOwner)
        form.append("jewelryName", jewelryName)
        form.append("jewelryModel", jewelryModel)
        form.append("jewelryLocation", jewelryLocation)
        form.append("jewelryInstallmentpaid", jewelryInstallmentpaid)
        form.append("jewelryInstallmentduration", jewelryInstallmentduration)
        form.append("jewelryDelinquent", jewelryDelinquent)
        form.append("jewelryDescriptions", jewelryDescriptions)
        form.append("fileCount", !jewelryFiles?0:jewelryFiles.length)

        if(!jewelryFiles)
            form.append("images", {})
        else{
            for(let jfile of jewelryFiles)
                form.append("images", jfile)
        }

        noCredAPI.post('/account/users/properties/post/jewelry',
            form,
            {
                headers: {"Content-Type": "multipart/form-data"},
                withCredentials: true
            }
        )
        .then(response => {
            // console.log(response)
            setHasError(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const resetJewelryProperty = (e)=>{
        e.preventDefault()
    }
    return(
        <>
            <section className={ jewelryStyle.jewelry_container }>
                { /successfull!/.test(hasError?.message) ? 
                    <div style={{marginBottom: "20px"}}><Error errorMessage={{message: hasError.message, color: "#00a824" }} /></div>
                    : ""}
                <form onSubmit={ submitJewelryProperty }>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry owner
                            {hasError?.jo?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryOwner" value={ jewelryOwner } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jo: false})
                                setJewelryOwner(e.target.value)
                            }}
                           placeholder="owner name" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry name
                            {hasError?.jn?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryName" value={ jewelryName } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jn: false})
                                setJewelryName(e.target.value)
                            }}
                           placeholder="jewelry name" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry model
                            {hasError?.jm?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryModel" value={ jewelryModel } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jm: false})
                                setJewelryModel(e.target.value)
                            }}
                            placeholder="jewelry model" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry location
                            {hasError?.jl?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryLocation" value={ jewelryLocation }
                            onChange = { (e)=> {
                                setHasError({...hasError, jl: false})
                                setJewelryLocation(e.target.value)
                            }}
                            placeholder="location" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry installmentpaid
                            {hasError?.jip?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryInstallmentpaid" value = { jewelryInstallmentpaid }
                            onChange = { (e)=> {
                                setHasError({...hasError, jip: false})
                                setJewelryInstallmentpaid(e.target.value)
                            }}
                            placeholder="installmentpaid" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry installmentduration
                            {hasError?.jid?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryInstallmentduration" value={ jewelryInstallmentduration }
                            onChange = { (e)=> {
                                setHasError({...hasError, jid: false})
                                setJewelryInstallmentduration(e.target.value)
                            }}
                            placeholder="duration" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry delinquent
                            {hasError?.jdel?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryDelinquent" value={ jewelryDelinquent }
                            onChange = { (e)=> {
                                setHasError({...hasError, jdel: false})
                                setJewelryDelinquent(e.target.value)
                            }}
                            placeholder="delinquent" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry description
                            {hasError?.jdesc?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jeweryDescription" value={ jewelryDescriptions }
                            onChange = { (e)=> {
                                setHasError({...hasError, jdesc: false})
                                setJewelryDescriptions(e.target.value)
                            }}
                            placeholder="description" />
                    </div>
                    <div className={ jewelryStyle.jewelry_images }>
                        <label>upload at least 3 images
                            {hasError?.jimg?<Messages type={"error"} message={hasError.message} />:""}
                        </label>
                        <input type="file" name="jewelry_image" multiple={true} 
                            onChange = { (e)=> {
                                setHasError({...hasError, jimg: false})
                                setJewelryFiles(e.target.files)
                            }}/>
                    </div>
                    <div className={ jewelryStyle.jewelry_buttons }>
                        <button>reset</button>
                        <button>submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Jewelry