import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../../hooks/context/useAuth'
import Loading from '../../../actionMessages/Loading'
import { noCredAPI, SERVER_PORT } from '../../../../routes/api/apiURL'
import viewEstateStyle from './ViewRealestates.module.css'
import LoadImage from '../../wrapper/LoadImage'
import Card from '../../wrapper/Card'

const ViewRealestates = ({ context })=>{
    const { onOpenModal } = context
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [realestateType, setRealestateType] = useState('realestates/all')
    const [realestatesLists, setRealestatesLists] = useState([])
    const navigate = useNavigate()
    const controller = new AbortController()

    useEffect(()=> {
        noCredAPI.get(`/properties/property-for-assumption/${realestateType}`,
            {
                signal: controller.signal
            }
        )
            .then(response => {
                console.log(response.data)
                setRealestatesLists(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                if(!err?.response)
                    setIsLoading(false)
            })
        return () =>{
            controller.abort()
        }
    }, [realestateType])

    const choosenRealestateType =(type) =>{
        setRealestateType(prev => {
            if(prev !== type){
                setRealestatesLists([])
                setIsLoading(true)
                return type
            }
            return prev
        })
    }
    return (
        <div>
            <div>
                <div className= {viewEstateStyle.realestate_nav }>
                    <ul>
                        <li><Link to='#all' onClick={ ()=> choosenRealestateType('realestates/all') }>all</Link></li>
                        <li><Link to='#house' onClick={ ()=> choosenRealestateType('realestates/house') }>house</Link></li>
                        <li><Link to='#house_and_lot' onClick={ ()=> choosenRealestateType('realestates/house and lot') }>house and lot</Link></li>
                        <li><Link to='#lot' onClick={ ()=> choosenRealestateType('realestates/lot') }>lot</Link></li>
                    </ul>
                </div>
            </div>
            {
                isLoading?<Loading message="fetching realestates..." width="50px" height="50px" />
                    :
                    realestatesLists.length === 0?"no content"
                    :
                    <div className={ viewEstateStyle.realestate_content_container }>
                        {
                            realestatesLists.map(realestateList =>{
                                return(
                                    <Card key={ realestateList.realestates[0]._id }>
                                        {/* realestateList?.realestates[0]? */}
                                        <div key = { realestateList.realestates[0]._id } className={ viewEstateStyle.realestate_content }>
                                            <div className={ viewEstateStyle.realestate_head }>
                                                <LoadImage image={
                                                    realestateList.realestates[0].realestate_type === "house"?`http://localhost:${SERVER_PORT}/${realestateList.realestates[0].properties.images[0]}`:
                                                        realestateList.realestates[0].realestate_type === "house and lot"?`http://localhost:${SERVER_PORT}/${realestateList.realestates[0].properties.images[0]}`
                                                        :`http://localhost:${SERVER_PORT}/${realestateList.realestates[0].properties.images[0]}`
                                                }/>
                                                <button onClick={ ()=> onOpenModal(realestateList.realestates[0].property_id) }>assume</button>
                                            </div>
                                            <div className={ viewEstateStyle.realestate_body }>
                                                <label>realestatetype: { realestateList.realestates[0].realestate_type }</label>
                                                {/house.?/.test(realestateList.realestates[0].realestate_type)?
                                                    <label>developer: &nbsp;
                                                        {realestateList.realestates[0].realestate_type === "house"?'wew':'ew'
                                                            // realestateList.realestates[0].properties.images.realestateDeveloper
                                                            // :realestateList.realestates[0].properties.images.realestateDeveloper
                                                        }
                                                    </label>
                                                    :""}
                                                <label>owner: { realestateList.realestates[0].realestate_owner }</label>
                                                <label>location: { realestateList.realestates[0].realestate_location }</label>
                                                <label>installmentpaid: { realestateList.realestates[0].realestate_installmentpaid }</label>
                                                <label>installmentduration: { realestateList.realestates[0].realestate_installmentduration }</label>
                                                <label>delinquent: { realestateList.realestates[0].realestate_delinquent }</label>
                                                <label>descriptions: { realestateList.realestates[0].realestate_description }</label>
                                                <div>
                                                    <button onClick={ ()=> navigate(realestateList.realestates[0]._id) }>view property</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* :""//if there is no realestate key go here */}
                                        
                                    </Card>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default ViewRealestates