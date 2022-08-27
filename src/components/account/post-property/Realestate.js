import realestateStyle from './Realestate.module.css'
import { realestateType } from '../../../staticData/data/postProperties'
import { useEffect, useState } from 'react'
import { noCredAPI } from '../../../routes/api/apiURL'
import Messages from '../../actionMessages/Messages'
import Error from '../../actionMessages/Error'

const Realestate = ()=>{
    const [realestateOwner, setRealestateOwner] = useState('')
    const [realestateDeveloper, setRealestateDeveloper] = useState('')
    const [choosenType, setChoosenType] = useState(realestateType[0].name)
    const [realestateLocation, setRealestateLocation] = useState('')
    const [realestateInstallmentpaid, setRealestateInstallmentpaid] = useState('')
    const [realestateInstallmentduration, setRealestateInstallmentduration] = useState('')
    const [realestateDelinquent, setRealestateDelinquent] = useState('')
    const [realestateDescriptions, setRealestateDescriptions] = useState('')
    const [realestatefiles, setRealestateFiles] = useState(null)
    const [hasError, setHasError] = useState(null)

    const submitRealestateProperty = (e)=>{
        e.preventDefault()

        var form = new FormData()

        form.append("propertyType", "realestates")
        form.append("realestateType", choosenType)
        form.append("realestateOwner", realestateOwner)
        form.append("realestateDeveloper", realestateDeveloper)
        form.append("realestateLocation", realestateLocation)
        form.append("realestateInstallmentpaid", realestateInstallmentpaid)
        form.append("realestateInstallmentduration", realestateInstallmentduration)
        form.append("realestateDelinquent", realestateDelinquent)
        form.append("realestateDescriptions", realestateDescriptions)
        form.append("fileCount", !realestatefiles?0:realestatefiles.length)
        if(!realestatefiles)
            form.append("images", {}) //means error
        else{
            for(let file of realestatefiles)
                form.append("images", file)
        }

        noCredAPI.post('/account/users/properties/post/realestates',
            form,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        )
            .then(response =>{
                setHasError(response.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    const resetRealestateProperty = (e)=>{
        e.preventDefault()
    }
    useEffect(()=>{

    }, [choosenType])
    return(
        <>
            <section className="realestate_container">
                { /successfull!/.test(hasError?.message) ? 
                    <div style={{marginBottom: "20px"}}><Error errorMessage={{message: hasError.message, color: "#00a824" }} /></div>
                    : ""}
               <form onSubmit={ submitRealestateProperty }>
                    <div className={ realestateStyle.realestate_content }>
                        <label>owner name
                            {hasError?.ro?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateOwner" value = { realestateOwner }
                            onChange = { (e)=> {
                                setHasError({...hasError, ro: false})
                                setRealestateOwner(e.target.value)
                            }}
                           placeholder="owner name" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>developer
                            {hasError?.rd?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDeveloper" value={ realestateDeveloper }
                            onChange = { (e)=> {
                                setHasError({...hasError, rd: false})
                                setRealestateDeveloper(e.target.value)
                            }}
                           placeholder="developer name" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate type</label>
                        <select name="realestate_type" value={ choosenType }
                            onChange = { (e)=> setChoosenType(e.target.value.toLocaleLowerCase()) }>
                            {
                                realestateType.map(rtype => <option key= { rtype.key }>{ rtype.name }</option>)
                            }
                        </select>
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>location
                            {hasError?.rl?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateLocation" value = { realestateLocation }
                            onChange = { (e)=> {
                                setHasError({...hasError, rl: false})
                                setRealestateLocation(e.target.value)
                            }}
                           placeholder="location" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate installmentpaid
                            {hasError?.rip?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestatateInstallmentpaid" value = { realestateInstallmentpaid }
                            onChange = { (e)=> {
                                setHasError({...hasError, rip: false})
                                setRealestateInstallmentpaid(e.target.value)
                            }}
                            placeholder="installmentpaid" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate installmentduration
                            {hasError?.rid?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateInstallmentduration" value={ realestateInstallmentduration }
                            onChange = { (e)=> {
                                setHasError({...hasError, rid: false})
                                setRealestateInstallmentduration(e.target.value)
                            }}
                            placeholder="installmentduration" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate delinquent
                            {hasError?.rdel?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDelinquent" value = { realestateDelinquent }
                            onChange = { (e)=> {
                                setHasError({...hasError, rdel: false})
                                setRealestateDelinquent(e.target.value)
                            }}
                            placeholder="delinquent" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate description
                            {hasError?.rdesc?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDescription" value = { realestateDescriptions }
                            onChange = { (e)=> {
                                setHasError({...hasError, rdesc: false})
                                setRealestateDescriptions(e.target.value)
                            }}
                            placeholder="description" />
                    </div>
                    <div className={ realestateStyle.realestate_images }>
                        <label>upload at least { 
                                /house.?/.test(choosenType)?5:
                                choosenType === "lot"? 3: 0
                            } images 
                            {hasError?.rimg?<Messages type="error" message={ hasError.message } />:""}
                        </label>
                        <input type="file" name="realestate_images" multiple={true} 
                            onChange = { (e)=> {
                                setHasError({...hasError, rimg: false})
                                setRealestateFiles(e.target.files)
                            }}
                            />
                    </div>
                    <div className={ realestateStyle.realestate_buttons }>
                        <button>reset</button>
                        <button>submit</button>
                    </div>
               </form>
            </section>
        </>
    )
}

export default Realestate