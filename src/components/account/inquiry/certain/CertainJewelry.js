import Loading from '../../../actionMessages/Loading'
import { useState, useEffect } from 'react'
import { noCredAPI } from '../../../../routes/api/apiURL'
import { useNavigate } from 'react-router-dom'
import certainjewelryStyle from './CertainJewelry.module.css'

const CertainJewelry = ({ params })=>{
    const [isLoading, setIsLoading] = useState(true)
    const [certainJewelry, setCertainJewelry] = useState({})
    const [mainImage, setMainImage] = useState({
        firstimage: ''
    })
    const navigate = useNavigate()

    useEffect(() =>{
        noCredAPI.get(`account/users/properties/inquiry/certain/${params.propertyType}/${params.id}`)
            .then(response => {
                console.log(response)
                setCertainJewelry(response.data)
                setMainImage({
                    firstimage: response.data.imageLists.jewelries[0]
                })
                setIsLoading(false)
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
            isLoading? <Loading message={`getting ${params.propertyType}`} width="50px" height="50px" />
                :
                <div className = { certainjewelryStyle.cj_container }>
                    <form onSubmit={(e)=> e.preventDefault()}>
                    <fieldset>
                        <legend>jewelry</legend>
                        <div className={ certainjewelryStyle.cj_content_container }>
                            <div className={ certainjewelryStyle.cj_content_left }>
                                <img src={ `http://localhost:${mainImage.firstimage}` } />
                                <div className={ certainjewelryStyle.supporting_image }>
                                    {
                                        certainJewelry.imageLists.jewelries.map((jewelry, i) => {
                                            if(i != 0)
                                                return <div key={i} className={ certainjewelryStyle.tooltip}>
                                                    <img key={i} src={ `http://localhost:${jewelry}`}
                                                        onClick={() => {
                                                            certainJewelry.imageLists.jewelries[i] = mainImage.firstimage
                                                            setMainImage({
                                                                firstimage: jewelry
                                                            })
                                                        }}
                                                         />
                                                    <span className={ certainjewelryStyle.tooltiptext}>click me</span>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={ certainjewelryStyle.cj_content_right }>
                                <label>owner: { certainJewelry.jewelryOwner }</label>
                                <label>jewelry name: { certainJewelry.jewelryName }</label>
                                <label>model: { certainJewelry.jewelryModel }</label>
                                <label>location: { certainJewelry.jewelryLocation }</label>
                                <label>installmentpaid: { certainJewelry.jewelryInstallmentpaid }</label>
                                <label>installmentduration: { certainJewelry.jewelryInstallmentduration }</label>
                                <label>delinquent: { certainJewelry.jewelryDelinquent }</label>
                                <label>descriptions: { certainJewelry.jewelryDescriptions }</label>
                                <button className={ certainjewelryStyle.btn_assume }>assume</button>
                                <button className={ certainjewelryStyle.btn_back }
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

export default CertainJewelry