import style from './Profile.module.css'
import avatar from '../../../../staticData/images/user.png'

const Profile = ({ profile })=>{
    return(
        <>
            {
                Object.values(profile).length > 0?
                    <div className={ style.profile_container }>
                        <div className={ style.profile_avatar }>
                            <img src={ avatar } />
                        </div>
                        <p className={ style.profile_user_name }>{ profile?.lastname }, { profile?.firstname } { profile?.middlename[0] }.</p>
                    </div>
                :
                'We cant identify you!'
            }
        </>
    )
}

export default Profile