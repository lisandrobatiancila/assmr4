import { useAuth } from '../../hooks/context/useAuth'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRefresh from '../../hooks/refresh/useRefresh'
import Loading from '../actionMessages/Loading'

const PersistLogin =()=>{
    const [isLoading, setIsLoading] = useState(true)
    const ref = useRefresh()
    const { auth } = useAuth()

    useEffect(()=>{
        const verifyRefresh = async()=>{
            try{
                await ref()
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setIsLoading(false)
            }
        }
       !auth?.accessToken? verifyRefresh() : setIsLoading(false)
    }, [])

    return(
        isLoading?<Loading width="50px" height="50px" />:<Outlet />
    )
}

export default PersistLogin