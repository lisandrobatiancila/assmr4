import { useEffect, useState } from 'react'
import { withCredAPI } from '../../../routes/api/apiURL'
import assumptionfromStyle from './AssumptionForm.module.css'
import Messages from '../../actionMessages/Messages'
import { useAuth } from '../../../hooks/context/useAuth'

const AssumptionForm = ({ context })=>{
    const { onCloseModal, setShowError, propertyID } = context
    const auth = useAuth()
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [contactno, setContactno] = useState('')
    const [work, setWork] = useState('')
    const [income, setIncome] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [barangay, setBarangay] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState({})

    useEffect(()=> {
        withCredAPI.get(
            `/assumptions/assumer-info/${auth?.auth?.account_email}`,
        )
        .then(response => {
            const { firstname, middlename, lastname, contactno, municipality, province, barangay } = response.data
            setFirstname(firstname)
            setMiddlename(middlename)
            setLastname(lastname)
            setContactno(contactno)
            setCity(municipality)
            setProvince(province)
            setBarangay(barangay)
        })
        .catch(err => {
            console.log(err)
            if(!err?.response)
                return setShowError({message: 'no server found', isError: true})
        })
    }, [])
    const submitAssumptionForm = (e)=>{
        e.preventDefault()

        withCredAPI.post(
            `/assumptions/user-submit-assumption-form`,
            {propertyID, firstname, middlename, lastname, contactno, 
                work, income, city, province, barangay, message },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${auth?.auth?.accessToken}`
                }
            }
        )
        .then(response =>{
            console.log(response)
            setError(response.data)
        })
        .catch(err =>{
            console.log(err)
            if(!err?.response)
                return setShowError({message: 'no server found', isError: true})
            setShowError({message: 'you should login first', isError: true})
        })
    }

    return(
        <>
            <div className={ assumptionfromStyle.assumption_container }>
                <form onSubmit={ submitAssumptionForm }>
                <div className={ assumptionfromStyle.assumption_content_container }>
                    <div className={ assumptionfromStyle.assumption_header }>
                        <h2>
                            assumption form
                            <span onClick={ onCloseModal }>&times;</span>
                        </h2>
                    </div>
                    <div className={ assumptionfromStyle.assumption_body }>
                        <label>firstname
                            {error?.fn?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Firstname" value={ firstname?firstname:'' } 
                            onChange = { (e)=> {
                                setError({...error, fn: false})
                                setFirstname(e.target.value)
                            }} />
                        <label>middlename
                            {error?.mn?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Middlename" value={ middlename?middlename:'' } 
                            onChange = { (e)=> {
                                setError({...error, mn: false})
                                setMiddlename(e.target.value)
                            }} />
                        <label>lastname
                            {error?.ln?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Lastname" value={ lastname?lastname:'' } 
                            onChange = { (e)=> {
                                setError({...error, ln: false})
                                setLastname(e.target.value)
                            }} />
                        <label>contactno
                            {error?.con?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Contactno" value={ contactno?contactno:'' } 
                            onChange = { (e) => {
                                setError({...error, con: false})
                                setContactno(e.target.value)
                            }} />
                        <label>work
                            {error?.wrk?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Work" value={ work } 
                            onChange = { (e) => {
                                setError({...error, wrk: false})
                                setWork(e.target.value)
                            }} />
                        <label>income
                            {error?.inc?<Messages type="error" message="empty fields / PHP only" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="text" placeholder="Income" value={ income } 
                           onChange = { (e)=> {
                               setError({...error, inc: false})
                               setIncome(e.target.value)
                           }} />
                        <fieldset className={ assumptionfromStyle.fieldset }>
                            <legend>address</legend>
                            <div>
                                <label>city
                                    {error?.cty?<Messages type="error" message="empty fields" />:""}
                                </label>
                                <input type="text" placeholder="city" value={ city?city:'' } 
                                    onChange = { (e)=> {
                                        setError({...error, cty: false})
                                        setCity(e.target.value)
                                    }} />
                            </div>
                            <div>
                                <label>province
                                    {error?.prvnce?<Messages type="error" message="empty fields" />:""}
                                </label>
                                <input type="text" placeholder="Province" value = { province?province:'' } 
                                    onChange = {(e)=> {
                                        setError({...error, prvnce: false})
                                        setProvince(e.target.value)
                                    }} />
                            </div>
                            <div>
                                <label>barangay
                                    {error?.brgy?<Messages type="error" message="empty fields" />:""}
                                </label>
                                <input type="text" placeholder="barangay" value={ barangay?barangay:'' } 
                                    onChange = {(e) => {
                                        setError({...error, brgy: false})
                                        setBarangay(e.target.value)
                                    }} />
                            </div>
                        </fieldset>
                        <label>message</label>
                        <textarea placeholder="send a message to property owner" rows={"5"}
                            value={ message } onChange = {(e) => setMessage(e.target.value) }></textarea>
                        {/* <label>date
                            {error?.dte?<Messages type="error" message="empty fields" />:""}
                        </label>
                        <div className={ assumptionfromStyle.divider }></div>
                        <input type="date" value={ date } 
                            onChange = { (e)=> {
                                setError({...error, dte: false})
                                setDate(e.target.value)
                            }} /> */}
                        <div className={ assumptionfromStyle.action_form }>
                            <input type="reset" className={ assumptionfromStyle.btn_reset } value="reset" />
                            <input type="submit" className={ assumptionfromStyle.btn_submit } value="submit" />
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}

export default AssumptionForm