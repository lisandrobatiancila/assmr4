import { useState, useEffect } from "react";
import { noCredAPI } from "../../../routes/api/apiURL";
import Loading from "../../actionMessages/Loading";
import { useLoadImage } from "../../../hooks/useLoadImage";

const LoadImage = ({ image }) =>{
    const [isLoading, setIsLoading] = useState(true)
    const newimage = useLoadImage(image)
    const [fimg, setFimg] = useState(null)
    
    useEffect(() => {
        setFimg(newimage)
        setIsLoading(false)
    }, [])
    
    return(
        <>
            {
                isLoading?<Loading message={"image..."} width="30px" height="30px" />:
                    fimg?fimg:"empty"
            }
        </>
    )
}

export default LoadImage