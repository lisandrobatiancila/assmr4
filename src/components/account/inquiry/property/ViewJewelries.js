import { useState, useEffect } from 'react'
import Loading from '../../../actionMessages/Loading'
import { noCredAPI, SERVER_PORT } from '../../../../routes/api/apiURL'
import viewjewelryStyle from './ViewJewelries.module.css'
import { useNavigate } from 'react-router-dom'
import LoadImage from '../../wrapper/LoadImage'
import Card from '../../wrapper/Card'

const ViewJewelries = ({ context })=>{
    const { onOpenModal } = context
    const [isLoading, setIsLoading] = useState(true)
    const [jewelryLists, setJewelryLists] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        noCredAPI.get('/properties/property-for-assumption/jewelries/NA')
            .then(response => {
                setJewelryLists(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                if(!err?.response)
                    setIsLoading(false)
            })
    }, [])
    return (
        <div className={ viewjewelryStyle.jewelry_container }>
            {
                isLoading?<Loading message="fetching jewelries..." width="50px" height="50px" />
                    :
                    jewelryLists.length === 0?"no content"
                    :
                    <div className={ viewjewelryStyle.jewelry_content }>
                        {
                            jewelryLists.map(jewelryList => {
                                return (
                                    <Card key={jewelryList.jrecords[0]._id}>
                                        <div>
                                            <div>
                                                <LoadImage image = { `http://localhost:${SERVER_PORT}/${jewelryList.jrecords[0].images[0]}`}/>
                                                <button onClick={ () => onOpenModal(jewelryList._id) }>assume</button>
                                            </div>
                                            <div>
                                            <label>owner: { jewelryList.jrecords[0].jewelry_owner }</label>
                                                <label>jewelry name: { jewelryList.jrecords[0].jewelry_name }</label>
                                                <label>type: { jewelryList.jrecords[0].jewelry_type }</label>
                                                <label>location: { jewelryList.jrecords[0].jewelry_location }</label>
                                                <label>installmentpaid: { jewelryList.jrecords[0].jewelry_installmentpaid }</label>
                                                <label>installmentduration: { jewelryList.jrecords[0].jewelry_installmentduration }</label>
                                                <label>delinquent: { jewelryList.jrecords[0].jewelry_delinquent }</label>
                                                <label>descriptions: { jewelryList.jrecords[0].jewelry_description }</label>
                                                <div>
                                                    <button onClick={ ()=> navigate(jewelryList.jrecords[0]._id)}>view property</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default ViewJewelries