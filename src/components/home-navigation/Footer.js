import style from './Footer.module.css'

const Footer = () =>{
    return(
        <>
            <div className={style.footer_container }>
                <div className={style.footer_content }>
                    <div className={ style.footer_first_content }>
                        <ul>
                            <li><a href='#'>assmr</a></li>
                            <li><a href='#'>terms and conditions</a></li>
                            <li><a href='#'>privacy policy</a></li>
                            <li><a href='#'>contact us</a></li>
                        </ul>
                    </div>
                    <div className={ style.footer_second_content }>
                        <p>All Copyright reserve &copy;2022 Designed & Developed by ASSUMR.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer