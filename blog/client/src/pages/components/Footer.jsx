import React,{ useState } from 'react';
import { FaInstagram } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'

function Footer(){
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        query: '',
    })
    const [subEmail, setSubEmail] = useState("")

    function sendForm(e){
        e.preventDefault();
        console.log(formData)
    }

    function handleChange(e){
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSub(e){
        setSubEmail(e.target.value)
    }

    function subscribe(e){
        e.preventDefault()
        console.log(subEmail)
    }

    return(
        <footer>
            <div className="footer-container">
                <div className="top">
                    <div className="row1">
                        <h2>Stay Connected</h2>
                        <p>Subscribe now to receive daily updates of the latest blogs our creators have to offer!</p>
                        <div className="footer-sub">
                            <form onSubmit={subscribe}>
                                <input onChange={handleSub} value={subEmail} type="text" placeholder='...Enter your email here'/>
                                <button>Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="row2">
                        <h2>About Us</h2>
                        <p>
                            We are a website dedicated to allowing people to talk about whatever they want, whenever they want to
                            however they want to. They is no limit or criteria for what can and cannot be posted here. 
                        </p>
                    </div>
                    <div className="row3">
                        <h2>Contact Us</h2>
                        <form onSubmit={sendForm}>
                            <input onChange={(e)=>handleChange(e)} value={formData.email} id="email" name="email" type="text" placeholder='...Enter email'/>
                            <input onChange={(e)=>handleChange(e)} value={formData.name} id="name" name="name"  type="text" placeholder='...Name'/>
                            <textarea onChange={(e)=>handleChange(e)} name="query" id="query" cols="30" rows="10" placeholder="...What is your query?"></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="bottom">
                    <p>&copy; 2023 aNyThNG, ALL RIGHTS RESERVED  | </p>
                    <div className="socials">
                        <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
                        <a href="https://facebook.com" target="_blank"><BsFacebook /></a>
                        <a href="https://twitter.com" target="_blank"><AiFillTwitterCircle /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer