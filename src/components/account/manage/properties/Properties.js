import { Outlet, useParams } from "react-router-dom"

const PostedProperties = ({ children })=>{
    const params = useParams()
    console.log(params)
    return (
        <>
            <div className="postedprop_container">
                <h3>properties</h3>
                <div className="postedprop_content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default PostedProperties