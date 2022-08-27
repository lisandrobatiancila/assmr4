import signinStyle from './Signin.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Error from '../../actionMessages/Error'
import { noCredAPI } from '../../../routes/api/apiURL'
import { useAuth } from '../../../hooks/context/useAuth'
import Messages from '../../actionMessages/Messages'

const Signin = ()=>{
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasError, setHasError] = useState({})
    const [disabled, setDisabled] = useState(false)

    const signinUser = (e)=>{
        e.preventDefault()
        setDisabled(true)
        noCredAPI.post('/signin/signin-user', 
            { email, password },
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        )
        .then(response => {
            if(/accepted/.test(response.data.message)){
                setHasError({message: "user accepted"})
                setTimeout(()=>{
                    setDisabled(true)
                    setAuth({
                        account_email: response.data.user,
                        accessToken: response.data.accessToken
                    })
                    navigate('/account/home', {state: {from: location}, replace: true})
                }, 1500)
            }
            else{
                setDisabled(false)
                setHasError(response.data)
            }
        })
        .catch(err => {
            console.log(`err: ${JSON.stringify(err)}`)

            if(!err?.response)
                setHasError({message: 'no server'})
            setHasError(err)
            setDisabled(false)
        })
    }
    useEffect(()=>{
        setHasError({})
    }, [email, password])

    return(
        <>
            {
                hasError?.message === "user accepted"? 
                    <Error errorMessage={{ message: hasError.message, color: "#00a824" }} />:
                    hasError?.message === "invalid credentials"?<Error errorMessage={{message: hasError.message, color: "#d13506"}} />:
                    hasError?.message === "no server"?<Error errorMessage={{ message: hasError.message, color: "#d13506" }} />:
                    /.?error.?/gi.test(hasError.message)?<Error errorMessage = {{ message: hasError.message, color: '#d13506' }} />:""
            }
            <section className={ signinStyle.signin_container}>
                <div className={ signinStyle.signin_content }>
                    <div className={ signinStyle.signin_header }>
                        <h3>signin</h3>
                    </div>
                    <div className={ signinStyle.signin_body }>
                        <form onSubmit={ signinUser } className={ signinStyle.signin_form }>
                                <label>username
                                    { hasError?.pem?<Messages type={"error"} message = {hasError.message} /> :""}
                                </label>
                                <input type="text" name="username" value = { email } disabled = { disabled }
                                    onChange = { (e)=> setEmail(e.target.value) }
                                    autoComplete="off" placeholder="username" />
                                <label>password
                                    { hasError?.pp?<Messages type={"error"} message = {hasError.message} /> :""}
                                </label>
                                <input type="password" name="password" value={ password } disabled = { disabled }
                                    onChange = { (e)=> setPassword(e.target.value) }
                                    placeholder="******" />
                                <div className={ signinStyle.signin_action }>
                                    <button>signin now</button>
                                    <span>don't have an account? <Link to='/signup'> register here</Link></span>
                                </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin