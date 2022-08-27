import signupStyle from './Signup.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { noCredAPI } from '../../../routes/api/apiURL'
import { address } from '../../../staticData/data/Address'
import Messages from '../../actionMessages/Messages'
import Error from '../../actionMessages/Error'

const Signup = ()=>{
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('male')
    const [contactno, setContactno] = useState('')
    const [provinceAddress, setProvinceAddress] = useState(address.cities[0])
    const [cityAddress, setCityAddress] = useState(address.cities[0].city)
    const [barangayAddress, setBarangayAddress] = useState(address.cities[0].city[0].barangay)
    const [certainProvince, setCertainProvince] = useState(address.cities[0].province)
    const [certainCity, setCertainCity] = useState(address.cities[0].city[0].name)
    const [certainBarangay, setCertainBarangay] = useState(address.cities[0].city[0].barangay[0].name)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [hasError, setHasError] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    const signupUser = (e)=>{
        e.preventDefault()
        const address = `${certainProvince}, ${certainCity}, ${certainBarangay}`
        noCredAPI.post('/signup/register-user', 
            { firstname, middlename, lastname, gender, contactno, 
                certainProvince, certainCity, certainBarangay, 
                address,
                email, password, retypePassword }
        )
        .then(response =>{
            if(response.data?.message && !/empty|exists|same/.test(response?.data?.message)){
                setHasError(response.data.message)
                setTimeout(()=>{
                    navigate('/signin', {state: {form: location}, replace: true})
                }, 2000)
            }
            setHasError(response.data)
        })
        .catch(err => console.error(err))
    }
    const resetSingup = ()=>{
        console.log('im reset')
    }
    return(
        <div className={ signupStyle.signup_container }>
            <section className={ signupStyle.signup_content }>
                <ul>
                    <li><Link to='#'>signup</Link></li>
                    <li><Link to='/'>home <span className={ signupStyle.arrow_right}></span> signup</Link></li>
                </ul>
            </section>
            {
                hasError?.message === "User already exists"?
                    <Error errorMessage={{ message: hasError.message, color: "#d13506" }}/>:
                    hasError?.message === "Signing up was successfull"?<Error errorMessage={
                        { message: "Signing up was successfull", color: "#00a824"}} />:""
            }
            <section>
                <div className={ signupStyle.left_content }>
                    <h3>complete details</h3>
                    <div className={ signupStyle.divider }></div>
                </div>
                <div className={ signupStyle.right_content }>
                    <form onSubmit={ signupUser }>
                        <div className={ signupStyle.user_form }>
                            <h3>basic information</h3>
                            <div className={ signupStyle.divider }></div>
                            <div className={ signupStyle.user_entry }>
                                <label>firstname
                                    {
                                        hasError?.firstname_err?<Messages type="error" message = "firstname is empty" />:""
                                    }
                                </label>
                                <input type="text" name="firstname" value={ firstname }
                                    onChange = { (e)=> {
                                        setHasError({...hasError, firstname_err: false})
                                        setFirstname(e.target.value)
                                    } }
                                    placeholder="Firstname" />
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>middlename
                                    {hasError?.middlename_err?<Messages type={"error"} message = "middlename is empty" />:""}
                                </label>
                                <input type="text" name="middlename" value={ middlename }
                                    onChange = { (e)=> {
                                        setHasError({...hasError, middlename_err: false})
                                        setMiddlename(e.target.value)
                                    } }
                                    placeholder="Middlename" />
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>lastname
                                    {hasError?.lastname_err?<Messages type={"error"} message="lastname is empty" />:""}
                                </label>
                                <input type="text" name="lastname" value = { lastname } 
                                    onChange = { (e)=> {
                                        setHasError({...hasError, lastname_err: false})
                                        setLastname(e.target.value)
                                    } }
                                    placeholder="Lastname" />
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>gender</label>
                                <select name="gender" value={ gender }
                                    onChange = { (e)=> setGender(e.target.value) }>
                                    <option>male</option>
                                    <option>female</option>
                                </select>
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>contact no.
                                    {hasError?.contactno_err?<Messages type={"error"} message={ "contactno is empty" } />:""}
                                </label>
                                <input type="text" name="contactno" value={ contactno } 
                                    onChange = { (e)=> {
                                        setHasError({...hasError, contactno_err: false})
                                        setContactno(e.target.value)
                                    } }
                                    placeholder="+09" />
                            </div>
                        </div>
                        <div className={ signupStyle.user_form }>
                            <h3>address information</h3>
                            <div className={ signupStyle.divider}></div>
                            <div className={ signupStyle.user_entry }>
                                <label>province</label>
                                <select name="province" value={ certainProvince } onChange = { 
                                    (e)=> {
                                        setCertainProvince(e.target.value)
                                        setCityAddress(address.cities.filter(city => city.province === e.target.value)[0].city)
                                        setBarangayAddress(address.cities.filter(city => city.province === e.target.value)[0].city[0].barangay)
                                    }}>
                                    {
                                        address.cities.map(city =>{
                                            return <option key={ city.id }>
                                                { city.province }
                                            </option>
                                        })
                                    }
                                </select>
                                
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>city</label>

                                <select name="city" value = { certainCity } onChange = { (e)=> 
                                {
                                    setCertainCity(e.target.value)
                                    setBarangayAddress(cityAddress.filter(city => city.name === e.target.value)[0].barangay)
                                }}>
                                    {
                                        cityAddress.map(city =>{
                                            return <option key ={ city.id }>
                                                { city.name }
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>barangay</label>
                                <select name="barangay" value = { certainBarangay } onChange ={ (e)=> 
                                {
                                    setCertainBarangay(e.target.value)
                                }}>
                                    {
                                        barangayAddress?.map(barangay =>{
                                            return <option key={ barangay.id }>
                                                { barangay.name }
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={ signupStyle.user_form }>
                            <h3>account information
                                {
                                    !hasError?.password_err && !hasError?.retypePassword_err?
                                        hasError?.pass_is_same_err?.is_err?<Messages type={"error"} message="password are not same" />:""
                                    :""
                                }
                            </h3>
                            
                            <div className={ signupStyle.divider }></div>
                            <div className={ signupStyle.user_entry }>
                                <label>email
                                    {hasError?.email_err?<Messages type={"error"} message="email is empty" />:""}
                                </label>
                                <input type="text" name="email" value = { email } autoComplete="off"
                                    onChange = { (e)=> {
                                        setHasError({...hasError, email_err: false})
                                        setEmail(e.target.value)
                                    } }
                                    placeholder="email" />
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>password
                                    {hasError?.password_err?<Messages type={"error"} message="password is empty" />:""}
                                </label>
                                <input type="password" name="password" value={ password } 
                                    onChange = { (e)=> {
                                        setHasError({...hasError, password_err: false })
                                        setPassword(e.target.value)
                                    } }
                                    placeholder="******" />
                            </div>
                            <div className={ signupStyle.user_entry }>
                                <label>retype password
                                    {hasError?.retypePassword_err?<Messages type={"error"} message="retype password is empty" />:""}
                                </label>
                                <input type="password" name="retypepassword" value = { retypePassword } 
                                    onChange = { (e)=> {
                                        setHasError({...hasError, retypePassword_err: false})
                                        setRetypePassword(e.target.value)
                                    } }
                                    placeholder="******" />
                            </div>
                            <div className={ signupStyle.bottom_container}>
                                <button>signup</button>
                                {/* <input type="reset" value={"reset form"} onClick={ resetSingup } /> */}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Signup