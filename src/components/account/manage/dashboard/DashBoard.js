import style from './DashBoard.module.css'
import { useState, useEffect } from 'react'
import { withCredAPI } from '../../../../routes/api/apiURL'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'
import { dashBoardBar } from '../../../../module/chartModule'

const DashBoard = ()=>{
    const [postedProperties, setPostedProperties] = useState("")
    const [assumedProperties, setAssumedProperties] = useState("")
    const [pieChart, setPieChart] = useState(null)
    const navigate = useNavigate()
    var chart = null

    useEffect(() => {
        const controller = new AbortController()
        withCredAPI.get(`/main/dashboard/total-of-assumed-and-posted-properties/${'assumed-and-posted-total'}`,
            {
                signal: controller.signal,
                withCredentials: true
            }
        )
            .then(response => {
                setPostedProperties(response.data.totalPosted)
                setAssumedProperties(response.data.totalAssumed)
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
                console.log(response)
                setPieChart(response.data)
                var data = {}
                const dsets = [] 
                var labels = []

                response.data.map(pieData => {
                    dsets.push(pieData.total_posted)
                    labels.push(pieData.key)
                })

                data = {
                    datasets: [
                        {
                            data: dsets,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                        }
                    ],
                    labels: labels
                }

                if(!chart){
                    chart = new Chart(ctx, {
                        type: 'doughnut',
                        data
                    })
                }
                //     chart = new Chart(ctx, {
                //         type: 'bar',
                //         data: dashBoardBar(response.data)
                //     })
                // chart = new Chart(ctx, {
                //     type: 'doughnut',
                //     data
                // })
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
                            <p>total posted: { postedProperties?postedProperties:"0" }</p>
                        </div>
                    </div>
                    <div className={ style.dashboard_thumbnail }>
                        <div className={ style.header }>
                            <h3>assumed properties</h3>
                        </div>
                        <div className={ style.body }>
                            <p>total assumed: { assumedProperties?assumedProperties:"0"} </p> 
                            {/* { 'not coded yet '} */}
                        </div>
                    </div>
                </section>
                <div className={ style.canvas_container }>
                    <div className={ style.canvas_content_left }>
                        <canvas id="myChart" width="20px"  height="20px"></canvas>
                    </div>
                    <div className={ pieChart?style.canvas_content_right:"" }>
                        {
                            pieChart? pieChart.map(chart =>
                                <div key={chart.key} className= { style.right_content_container }>
                                    <div className= { style.right_content_header }>
                                        <h4>{ chart.key }</h4>
                                    </div>
                                    <div className={ style.right_content_body }>
                                        <div className={ style.left_body_content}>
                                            <small>total posted property</small>
                                            <p>
                                                { chart.total_posted }
                                            </p>
                                        </div>
                                        <div className={ style.right_body_content }>
                                            <small>total assumer</small>
                                            <p>
                                                { chart.total_assumer }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                            :""
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default DashBoard