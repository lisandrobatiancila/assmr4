import { withCredAPI } from '../../routes/api/apiURL'
import { useAuth } from '../context/useAuth'

const useRefresh = ()=>{
    const { setAuth } = useAuth()

    const refresh = async()=>{
        const response = await withCredAPI.get('/refresh/refresh-token')
        setAuth((prev)=>{
            return {
                ...prev,
                account_email: response.data.email,
                accessToken: response.data.accessToken
            }
        })
        return response?.data?.accessToken
    }

    return refresh
}

export default useRefresh