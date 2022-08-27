import { Link } from 'react-router-dom'

const UserActions = ()=>{
    return(
        <div>
            <Link to='/account/manage'>manage account</Link>
            <Link to='#'>logout</Link>
        </div>
    )
}

export default UserActions