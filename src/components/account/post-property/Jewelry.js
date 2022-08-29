import { useEffect, useState } from 'react'
import jewelryStyle from './Jewelry.module.css'
import { noCredAPI } from '../../../routes/api/apiURL'
import Error from '../../actionMessages/Error'
import Messages from '../../actionMessages/Messages'
import { useAuth } from '../../../hooks/context/useAuth'

const Jewelry = ()=>{
    const auth = useAuth()
    const [jewelryOwner, setJewelryOwner] = useState('')
    const [jewelryContactno, setJewelryContactno] = useState('') 
    const [jewelryName, setJewelryName] = useState('')
    const [jewelryModel, setJewelryType] = useState('')
    const [jewelryLocation, setJewelryLocation] = useState('')
    const [jewelryInstallmentpaid, setJewelryInstallmentpaid] = useState('')
    const [jewelryInstallmentduration, setJewelryInstallmentduration] = useState('')
    const [jewelryDelinquent, setJewelryDelinquent] = useState('')
    const [jewelryDescriptions, setJewelryDescriptions] = useState('')
    const [hasError, setHasError] = useState(null)
    const [jewelryFiles, setJewelryFiles] = useState(null)

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

            setJewelryOwner(fullname)
            setJewelryContactno(contactno)
            setJewelryLocation(location)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const submitJewelryProperty = (e)=>{
        e.preventDefault()
        
        var form = new FormData()
        form.append("propertyType", "jewelry")
        form.append("jowner", jewelryOwner)
        form.append('jcontactno', jewelryContactno)
        form.append("jlocation", jewelryLocation)
        form.append("jjewelryName", jewelryName)
        form.append("jjewelryType", jewelryModel)
        form.append("jinstallmentpaid", jewelryInstallmentpaid)
        form.append("jinstallmentduration", jewelryInstallmentduration)
        form.append("jdelinquent", jewelryDelinquent)
        form.append("jdescription", jewelryDescriptions)
        form.append("fileCount", !jewelryFiles?0:jewelryFiles.length)

        if(!jewelryFiles)
            form.append("files", {})
        else{
            for(let jfile of jewelryFiles)
                form.append("files", jfile)
        }

        noCredAPI.post('/main/post/jewelry',
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${auth?.auth?.accessToken}`
                },
                withCredentials: true
            }
        )
        .then(response => {
            setHasError(response.data)
            
            if(!response?.data?.has_error){
                setJewelryName('')
                setJewelryType('')
                setJewelryInstallmentpaid('')
                setJewelryInstallmentduration('')
                setJewelryDelinquent('')
                setJewelryDescriptions('')
                setJewelryFiles(null)
                form = null
            }
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
                { /successfull/.test(hasError?.message) ? 
                    <div style={{marginBottom: "20px"}}><Error errorMessage={{message: hasError.message, color: "#00a824" }} /></div>
                    : ""}
                <form onSubmit={ submitJewelryProperty }>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry owner
                            {hasError?.jowner_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryOwner" value={ jewelryOwner } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jowner_err: false})
                                setJewelryOwner(e.target.value)
                            }}
                           placeholder="owner name" disabled />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>contactno. #
                            {hasError?.jjewelryContactno_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryName" value={ jewelryContactno } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jjewelryContactno_err: false})
                                setJewelryContactno(e.target.value)
                            }}
                           placeholder="contactno. #" disabled />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>location
                            {hasError?.jlocation_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryLocation" value={ jewelryLocation }
                            onChange = { (e)=> {
                                setHasError({...hasError, jlocation_err: false})
                                setJewelryLocation(e.target.value)
                            }}
                            placeholder="location" disabled />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry name
                            {hasError?.jjewelryName_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryName" value={ jewelryName } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jjewelryName_err: false})
                                setJewelryName(e.target.value)
                            }}
                           placeholder="jewelry name" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry type
                            {hasError?.jjewelryType_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryModel" value={ jewelryModel } 
                            onChange = { (e)=> {
                                setHasError({...hasError, jjewelryType_err: false})
                                setJewelryType(e.target.value)
                            }}
                            placeholder="jewelry type" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry installmentpaid
                            {hasError?.jinstallmentpaid_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryInstallmentpaid" value = { jewelryInstallmentpaid }
                            onChange = { (e)=> {
                                setHasError({...hasError, jinstallmentpaid_err: false})
                                setJewelryInstallmentpaid(e.target.value)
                            }}
                            placeholder="installmentpaid" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry installmentduration
                            {hasError?.jinstallmentduration_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryInstallmentduration" value={ jewelryInstallmentduration }
                            onChange = { (e)=> {
                                setHasError({...hasError, jinstallmentduration_err: false})
                                setJewelryInstallmentduration(e.target.value)
                            }}
                            placeholder="duration" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry delinquent
                            {hasError?.jdelinquent_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jewelryDelinquent" value={ jewelryDelinquent }
                            onChange = { (e)=> {
                                setHasError({...hasError, jdelinquent_err: false})
                                setJewelryDelinquent(e.target.value)
                            }}
                            placeholder="delinquent" />
                    </div>
                    <div className={ jewelryStyle.jewelry_content }>
                        <label>jewelry description
                            {hasError?.jdescription_err?<Messages type={"error"} message="empty fields" />:""}
                        </label>
                        <input type="text" name="jeweryDescription" value={ jewelryDescriptions }
                            onChange = { (e)=> {
                                setHasError({...hasError, jdescription_err: false})
                                setJewelryDescriptions(e.target.value)
                            }}
                            placeholder="description" />
                    </div>
                    <div className={ jewelryStyle.jewelry_images }>
                        <label>upload at least 3 images
                            {hasError?.fileCount_err?<Messages type={"error"} message={"kindly upload at least 3 images"} />:""}
                        </label>
                        <input type="file" name="jewelry_image" multiple={true} 
                            onChange = { (e)=> {
                                setHasError({...hasError, fileCount_err: false})
                                setJewelryFiles(e.target.files)
                            }}/>
                    </div>
                    <div className={ jewelryStyle.jewelry_buttons }>
                        <button type="reset">reset</button>
                        <button>submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Jewelry