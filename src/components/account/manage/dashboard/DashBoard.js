import style from './DashBoard.module.css'
import { useState, useEffect } from 'react'
import { withCredAPI } from '../../../../routes/api/apiURL'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'
import { dashBoardBar } from '../../../../module/chartModule'

const DashBoard = ()=>{
    const [postedProperties, setPostedProperties] = useState({})
    const [assumedProperties, setAssumedProperties] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()
        withCredAPI.get(`/main/dashboard/total-of-assumed-and-posted-properties/${'assumed-and-posted-total'}`,
            {
                signal: controller.signal,
                withCredentials: true
            }
        )
            .then(response => {
                setPostedProperties(response.data)
            })
            .catch(err => {
                console.log(err)
                if(err.response.status == 401)
                    navigate('/')
            })
        return () =>{
            controller.abort()
        }
    }, [])

    const dashboardPostedProperties = () =>{
        const ctx = document.getElementById('myChart').getContext('2d')

        withCredAPI.get(`/main/dashboard/total-of-assumed-and-posted-properties/${'data-inquiry'}`)
            .then(response => {
                // console.log(response)
                var chart = null
                if(!chart)
                    chart = new Chart(ctx, {
                        type: 'bar',
                        data: dashBoardBar(response.data)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return(
        <>
            <main className={ style.dashboard_container }>
                <section className={ style.dashboard_content }>
                    <h3>dashboard</h3>
                    <div className={ style.dashboard_thumbnail } onClick = { dashboardPostedProperties }>
                        <div className={ style.header }>
                            <h3>
                                posted properties
                            </h3>
                        </div>
                        <div className={ style.body }>
                            <p>total posted: { postedProperties.totalPosted }</p>
                        </div>
                    </div>
                    <div className={ style.dashboard_thumbnail }>
                        <div className={ style.header }>
                            <h3>assumed properties</h3>
                        </div>
                        <div className={ style.body }>
                            <p>total assumed: { 'not coded yet '}</p>
                        </div>
                    </div>
                </section>
                <canvas id="myChart" width="120" height="50"></canvas>
            </main>
        </>
    )
}

export default DashBoard