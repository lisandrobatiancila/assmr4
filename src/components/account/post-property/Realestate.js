import realestateStyle from './Realestate.module.css'
import { realestateType } from '../../../staticData/data/postProperties'
import { useEffect, useState } from 'react'
import { noCredAPI } from '../../../routes/api/apiURL'
import Messages from '../../actionMessages/Messages'
import Error from '../../actionMessages/Error'
import { useAuth } from '../../../hooks/context/useAuth'

const Realestate = ()=>{
    const auth = useAuth()
    const [realestateOwner, setRealestateOwner] = useState('')
    const [realestateContactno, setRealestateContactno] = useState('')
    const [realestateDeveloper, setRealestateDeveloper] = useState('')
    const [choosenType, setChoosenType] = useState(realestateType[0].name)
    const [realestateLocation, setRealestateLocation] = useState('')
    const [realestateInstallmentpaid, setRealestateInstallmentpaid] = useState('')
    const [realestateInstallmentduration, setRealestateInstallmentduration] = useState('')
    const [realestateDelinquent, setRealestateDelinquent] = useState('')
    const [realestateDescriptions, setRealestateDescriptions] = useState('')
    const [realestatefiles, setRealestateFiles] = useState(null)
    const [hasError, setHasError] = useState(null)

    useEffect(() => {
        noCredAPI.get(
            `/main/post/active-user-info`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.auth?.accessToken}`
                }
            }
        )
        .then(response => {
            const fullname = `${response?.data?.lastname}, ${response?.data?.firstname} ${response?.data?.middlename[0]}`
            const contactno = response?.data?.contactno
            const location = `${response?.data?.province}, ${response?.data?.municipality}, ${response?.data?.barangay}`

            setRealestateOwner(fullname)
            setRealestateContactno(contactno)
            setRealestateLocation(location)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const submitRealestateProperty = (e)=>{
        e.preventDefault()

        var form = new FormData()

        form.append("propertyType", "realestates")
        form.append("realestateType", choosenType)
        form.append("realestateOwner", realestateOwner)
        form.append("realestateLocation", realestateLocation)
        form.append("realestateContactno", realestateContactno)
        form.append("realestateDeveloper", realestateDeveloper)
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

        noCredAPI.post('/main/post/real-estate',
            form,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        )
            .then(response =>{
                setHasError(response.data)
                if(!response?.data?.has_error) {
                    setRealestateDeveloper(/house.?/.test(choosenType)?'':'N/A')
                    setRealestateInstallmentpaid('')
                    setRealestateInstallmentduration('')
                    setRealestateDelinquent('')
                    setRealestateDescriptions('')
                    setRealestateFiles(null)
                    form = null
                }
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
                { /successfull/.test(hasError?.message) ? 
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
                           placeholder="owner name" disabled />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>contactno. #
                            {hasError?.rl?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateLocation" value = { realestateContactno }
                            onChange = { (e)=> {
                                setHasError({...hasError, rl: false})
                                setRealestateLocation(e.target.value)
                            }}
                           placeholder="contactno.#" disabled />
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
                           placeholder="location" disabled />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>developer
                            {hasError?.realdeveloper_err?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDeveloper" value={ realestateDeveloper }
                            onChange = { (e)=> {
                                setHasError({...hasError, realdeveloper_err: false})
                                setRealestateDeveloper(e.target.value)
                            }}
                           placeholder="developer name" disabled={/house.?/.test(choosenType)?false:true} />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate type</label>
                        <select name="realestate_type" value={ choosenType }
                            onChange = { (e)=> {
                                setChoosenType(e.target.value.toLocaleLowerCase())
                                setRealestateDeveloper(/house.?/.test(e.target.value)?'':'N/A')
                                setHasError(/house.?/.test(e.target.value)?{...hasError}:{...hasError, realdeveloper_err: false})
                            } }>
                            {
                                realestateType.map(rtype => <option key= { rtype.key }>{ rtype.name }</option>)
                            }
                        </select>
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate installmentpaid
                            {hasError?.realinstallmentpaid_err?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestatateInstallmentpaid" value = { realestateInstallmentpaid }
                            onChange = { (e)=> {
                                setHasError({...hasError, realinstallmentpaid_err: false})
                                setRealestateInstallmentpaid(e.target.value)
                            }}
                            placeholder="installmentpaid" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate installmentduration
                            {hasError?.realinstallmentduration_err?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateInstallmentduration" value={ realestateInstallmentduration }
                            onChange = { (e)=> {
                                setHasError({...hasError, realinstallmentduration_err: false})
                                setRealestateInstallmentduration(e.target.value)
                            }}
                            placeholder="installmentduration" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate delinquent
                            {hasError?.realdelinquent_err?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDelinquent" value = { realestateDelinquent }
                            onChange = { (e)=> {
                                setHasError({...hasError, realdelinquent_err: false})
                                setRealestateDelinquent(e.target.value)
                            }}
                            placeholder="delinquent" />
                    </div>
                    <div className={ realestateStyle.realestate_content }>
                        <label>realestate description
                            {hasError?.realdescription_err?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <input type="text" name="realestateDescription" value = { realestateDescriptions }
                            onChange = { (e)=> {
                                setHasError({...hasError, realdescription_err: false})
                                setRealestateDescriptions(e.target.value)
                            }}
                            placeholder="description" />
                    </div>
                    <div className={ realestateStyle.realestate_images }>
                        <label>upload at least { 
                                /house.?/.test(choosenType)?5:
                                choosenType === "lot"? 3: 0
                            } images 
                            {hasError?.fileCount_err?<Messages type="error" message={ /house.?/.test(choosenType)?'kindly upload at least 5 images'
                                :'kindly upload at least 3 images' } />:""}
                        </label>
                        <input type="file" name="realestate_images" multiple={true} 
                            onChange = { (e)=> {
                                setHasError({...hasError, fileCount_err: false})
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