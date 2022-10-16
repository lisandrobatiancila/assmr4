import { useState } from 'react'
import { SERVER, SERVER_PORT  } from '../../routes/api/apiURL'
import sliderStyle from './Slider.module.css'

function Slider({ images }) {
    const imageLen = images.length
    var imageBaseIndex = 0
   const [imagesSlider, setImagesSlider] = useState(images[imageBaseIndex])

    return (
        <div className={ sliderStyle.slider_container }>
            <div>
                <img src={`${SERVER.URI}${SERVER_PORT}/${imagesSlider}`} width="350px" height="300px" />
            </div>
        </div>
    )
}

export default Slider