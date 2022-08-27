import style from './FeedBackModal.module.css'
import { useState, useEffect } from 'react'
import { withCredAPI } from '../../../../routes/api/apiURL'

const FeedBackModal = ({ toggleModal }) => {
    const initStarVal = [
        {rating: 1, active: false, color: '#ec920b'},
        {rating: 2, active: false, color: '#ec920b'},
        {rating: 3, active: false, color: '#ec920b'},
        {rating: 4, active: false, color: '#ec920b'},
        {rating: 5, active: false, color: '#ec920b'}
    ]
    
    const [starColor, setStarColor] = useState(initStarVal)
    const [satisfaction, setSatisFaction] = useState('very satisfied')
    const [ratingStar, setRatingStar] = useState(0)
    const [comment, setComment] = useState('')

    const changeRatingStar = (params) => {
        setStarColor(stars => {
            return stars.map(star => star.rating <= params?
                {rating: star.rating, active: true, color: star.color}
                :
                {rating: star.rating, active: false, color: star.color}
            )
        })
        setRatingStar(params)
    }

    const saveFeedBack = (e) => {
        e.preventDefault()
        withCredAPI.post('/account/users/manage/feedbacks/user-send-feedbacks',
            {satisfaction, rating: ratingStar, comment}
        )
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className={ style.feedback_modal_container }>
                <div className={ style.feedback_modal_header }>
                    <h2>
                        give us feedback
                        <a onClick={ toggleModal }>&times;</a>
                    </h2>
                </div>
                <div className={ style.feedback_modal_body }>
                    <form onSubmit={ saveFeedBack }>
                        <div className={ style.feedback_modal_body_satisfaction }>
                            <div>how satisfied are you?</div>
                            <div className={ style.divider }></div>
                            <div className={ style.satisfaction_value }>
                                <label>
                                    <input type="radio" onChange={()=> setSatisFaction('very satisfied')} name='satisfaction' value="very satisfied"
                                        />
                                    <span>very satisfied</span>
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" onChange={()=> setSatisFaction('satisfied')} name='satisfaction' value="satisfied"/>
                                    <span>satisfied</span>
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" onChange={()=> setSatisFaction('not satisfied')} name='satisfaction' value="not satisfied"/>
                                    <span>not satisfied</span>
                                </label>
                            </div>
                            
                        </div>
                        <div className={ style.feedback_modal_body_rate_us }>
                            <p>rate us</p>
                            <div className={ style.divider }></div>
                            <div className={ style.rate_star }>
                                <i className='fa fa-star' 
                                    style={{color: starColor[0].active?starColor[0].color:'#ccc'}}
                                    onClick={ () => changeRatingStar(1) }></i>
                                <i className='fa fa-star' 
                                    style={{color: starColor[1].active?starColor[1].color:'#ccc'}}
                                    onClick={ () => changeRatingStar(2) }></i>
                                <i className='fa fa-star' 
                                    style={{color: starColor[2].active?starColor[2].color:'#ccc'}}
                                    onClick={ () => changeRatingStar(3) }></i>
                                <i className='fa fa-star' 
                                    style={{color: starColor[3].active?starColor[3].color:'#ccc'}}
                                    onClick={ () => changeRatingStar(4) }></i>
                                <i className='fa fa-star' 
                                    style={{color: starColor[4].active?starColor[4].color:'#ccc'}}
                                    onClick={ () => changeRatingStar(5) }></i>
                            </div>
                        </div>

                        <div className={ style.feedback_modal_body_comment }>
                            <p>comment</p>
                            <div className={ style.divider }></div>
                            <textarea placeholder="leave us a message..."
                                rows={10}
                                name="comment"
                                style={{ fontFamily: 'sans-serif'}}
                                onChange={ (e)=> setComment(e.target.value)}>

                            </textarea>
                        </div>
                        <div className={ style.feedback_modal_body_buttons }>
                            <button>submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default FeedBackModal