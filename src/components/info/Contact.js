import style from './Contact.module.css'

const Contact = () =>{
    return(
        <>
            <div className={ style.contact_container }>
                <section className={ style.first_container }>
                    <div className={style.first_content_left}>
                        <p>contact form and information</p>
                        <div className={ style.divider }></div>
                    </div>
                    <div className={ style.first_content_right}>
                        <p>Have a questions? Send us an e-mail</p>
                        <label>full name</label>
                        <input type="text" placeholder="Full Name" />
                        <label>email address</label>
                        <input type="text" placeholder="email" />
                        <label>your comments</label>
                        <textarea placeholder="comments...">
                            
                        </textarea>
                    </div>
                </section>
                <section className={ style.second_container }>

                </section>
            </div>
        </>
    )
}

export default Contact