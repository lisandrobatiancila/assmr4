import Loading from '../../../actionMessages/Loading'
import { useState, useEffect } from 'react'
import certainrealestateStyle from './CertainRealestate.module.css'
import { useNavigate } from 'react-router-dom'
import { noCredAPI } from '../../../../routes/api/apiURL'
import { SERVER_PORT } from '../../../../routes/api/apiURL'

const CertainRealestate = ({ params })=>{
    const [isLoading, setIsLoading] = useState(true)
    const [certainRealestate, setCertainRealestate] = useState({})
    const [mainImage, setMainImage] = useState({
        firstImage: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        noCredAPI.get(`/properties/certain-property/${params.propertyType.replace(/s$/, '')}/${params.id}`)
            .then(response => {
                console.log(response.data)
                setCertainRealestate(response.data)
                setMainImage({
                    firstImage: response.data.realestate_type === "house and lot"?response.data.info.imageLists.hal[0]
                        :response.data.realestate_type === "house"?response.data.info.imageLists.houses[0]
                        :`http://localhost:${SERVER_PORT}/${response.data.images.images[0]}`
                })
                setIsLoading(false)
                console.log(mainImage)
            })
            .catch(err => {
                console.log(err)
                if(!err?.response)
                    console.log('no server')
                setIsLoading(false)
            })
    }, [])
    
    return(
        <>
            {
            isLoading? <Loading message={`getting ${params.propertyType}`} width="50px" height="50px"  />
                :
                <div className = { certainrealestateStyle.cr_container }>
                    <form onSubmit={(e)=> e.preventDefault()}>
                    <fieldset>
                        <legend>Realestates</legend>
                        <div className={ certainrealestateStyle.cr_content_container }>
                            <div className={ certainrealestateStyle.cr_content_left }>
                                <img src={ 
                                    certainRealestate.realestateType === "house"?`http://localhost:${mainImage.firstImage}`:
                                    certainRealestate.realestateType === "house and lot"?`http://localhost:${mainImage.firstImage}`
                                    :`http://localhost:${mainImage.firstImage}`
                                 } />
                                <div className={ certainrealestateStyle.supporting_image }>
                                    {
                                        certainRealestate.realestate_type === "house"?
                                            certainRealestate.info.imageLists.houses.map((house, i) =>{
                                                if(i != 0)
                                                    return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                        <img key={i} src={ `http://localhost:${house}` } 
                                                            onClick={() =>{
                                                                certainRealestate.info.imageLists.houses[i] = mainImage.firstImage
                                                                setMainImage({
                                                                    firstImage: house
                                                                })
                                                            }}
                                                        />
                                                        <span className={ certainrealestateStyle.tooltiptext}>click me</span>
                                                    </div>
                                            })
                                        :
                                        certainRealestate.realestate_type === "house and lot"?
                                            certainRealestate.info.imageLists.hal.map((hal, i) =>{
                                                if(i != 0)
                                                    return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                        <img key={i} src={ `http://localhost:${hal}` } 
                                                            id={`img${i}`} onClick={()=> {
                                                                certainRealestate.info.imageLists.hal[i] = mainImage.firstImage
                                                                setMainImage({
                                                                    firstImage: hal
                                                                })
                                                            } } />
                                                        <span className={ certainrealestateStyle.tooltiptext}>
                                                            click me
                                                        </span>
                                                    </div>
                                            })
                                        : 
                                        certainRealestate.images.images.map((lot, i) => {
                                            if(i != 0)
                                                return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                    <img key={i} src={ `http://localhost:${SERVER_PORT}/${lot} `} 
                                                        onClick={() =>{
                                                            certainRealestate.images.images[i] = mainImage.firstImage
                                                            setMainImage({
                                                                firstImage: lot
                                                            })
                                                        }}
                                                    />
                                                    <span className={ certainrealestateStyle.tooltiptext}>click me</span>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={ certainrealestateStyle.cr_content_right }>
                                <label>owner: { certainRealestate.realestate_owner }</label>
                                <label>realestatetype: { certainRealestate.realestate_type }</label>
                                <label>location: { certainRealestate.realestate_location }</label>
                                <label>installmentpaid: { certainRealestate.realestate_installmentpaid }</label>
                                <label>installmentduration: { certainRealestate.realestate_installmentduration }</label>
                                <label>delinquent: { certainRealestate.realestate_delinquent }</label>
                                <label>descriptions: { certainRealestate.realestate_description }</label>
                                <button className={ certainrealestateStyle.btn_assume }>assume</button>
                                <button className={ certainrealestateStyle.btn_back }
                                    onClick={ ()=> navigate(-1)}>back</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                </div>
        }
        </>
    )
}

export default CertainRealestate