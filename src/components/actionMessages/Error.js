import errorStyle from './Error.module.css'
import { useEffect, useRef } from 'react'

const Error = ({ errorMessage })=>{
    const header_ref = useRef()

    useEffect(()=>{
        header_ref.current.style.backgroundColor = errorMessage.color
    }, [])
    return(
        <div className={ errorStyle.error_container }>
            <div className={ errorStyle.error_header} ref = { header_ref }>
                { errorMessage.message }
            </div>
        </div>
    )
}

export default Error