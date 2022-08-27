import { useState } from 'react'
import style from './FeedBack.module.css'
import FeedBackModal from './FeedBackModal'
import { withCredAPI } from '../../../../routes/api/apiURL'
import { useEffect } from 'react'

const FeedBack = () =>{
    const [openModal, setOpenModal] = useState(false)
    const [feedBacks, setFeedBacks] = useState([])
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    
    useEffect(() => {
        withCredAPI.get('/account/users/manage/feedbacks/user-feedbacks')
            .then(response => setFeedBacks(response.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <section>
                <div className={ style.feedback_container }>
                    <p>for us, your voice does really matters!.</p>
                    {JSON.stringify(feedBacks)}
                    <div className="feedback_user">
                        <p>user image</p>
                        <p>user feedbacks</p>
                    </div>
                    
                    <div className={ style.toggle_feedback }>
                        <button onClick={ toggleModal }>let us hear your voice!</button>
                    </div>

                </div>
                <div className={ openModal?style.open_modal:style.close_modal }>
                    <FeedBackModal toggleModal = { toggleModal } />
                </div>
            </section>
        </>
    )
}

export default FeedBack