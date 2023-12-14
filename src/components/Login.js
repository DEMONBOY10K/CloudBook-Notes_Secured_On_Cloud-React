import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './css/Login.module.css';
import { Link } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();

    const [creds, setCreds] = useState({email:"",password:""});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host = "http://localhost:5000"
        const url = `${host}/api/auth/login-user`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:creds.email, password:creds.password}),
        });
        console.log(response);
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            if(json.success){
                //Save auth Token & Redirect
                localStorage.setItem('token',json.authtoken);
                navigate("/");
                props.showAlert("Login Successfull","success");
            }
            else{
                props.showAlert("Login Failed","danger");
            }
        } else {
            const json = await response.json();
            console.log(json);
            props.showAlert(json.error,"danger");
        }
        
    }

    const handleTextChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})
    }
    return (
        <div className={`container ${styles.containerLogin} my-3`}> {/* Combine Bootstrap and CSS module classes */}
            <div className={`login-box ${styles['login-box']}`}> {/* Combine Bootstrap and CSS module classes */}
                <div className={`login-box-formbox ${styles['login-box-formbox']}`}> {/* Combine Bootstrap and CSS module classes */}
                    <div className={`login-box-login ${styles['login-box-login']}`}> {/* Combine Bootstrap and CSS module classes */}
                        <h1>Welcome Back to CloudBook</h1>
                        <p>
                            CloudBook is designed with simplicity in mind. No more hunting through stacks of paper or disorganized digital files.
                        </p>
                        <form className={`formLogin ${styles.formLogin}`}  > {/* Combine Bootstrap and CSS module classes */}
                            <div>
                                <label htmlFor="email"> E-Mail</label>
                                <input type="email" name="email" id ="email" className={`input-email ${styles['input-email']}`} onChange={handleTextChange} /> {/* Combine Bootstrap and CSS module classes */}
                            </div>
                            <div>
                                <label htmlFor="password"> Password</label>
                                <input type="password" name="password" id = "password" className={`input-password ${styles['input-password']}`} onChange={handleTextChange}/> {/* Combine Bootstrap and CSS module classes */}
                            </div>
                            <div>
                                <input type="button" value="Login to account" onClick={handleSubmit} className={`btn ${styles.btn}`} /> {/* Combine Bootstrap and CSS module classes */}
                            </div>
                        </form>
                        <div className={`alternate-text ${styles['alternate-text']}`}>Or LogIn with</div> {/* Combine Bootstrap and CSS module classes */}
                        <div className={`alternate-boxes ${styles['alternate-boxes']}`}> {/* Combine Bootstrap and CSS module classes */}
                            <div className={`alternate-box ${styles['alternate-box']}`}> {/* Combine Bootstrap and CSS module classes */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-brand-google"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                                </svg>
                            </div>
                            <div className={`alternate-box ${styles['alternate-box']}`}> {/* Combine Bootstrap and CSS module classes */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-brand-facebook"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
                                    ></path>
                                </svg>
                            </div>
                            <div className={`alternate-box ${styles['alternate-box']}`}> {/* Combine Bootstrap and CSS module classes */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-brand-apple"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M9 7c-3 0 -4 3 -4 5.5c0 3 2 7.5 4 7.5c1.088 -.046 1.679 -.5 3 -.5c1.312 0 1.5 .5 3 .5s4 -3 4 -5c-.028 -.01 -2.472 -.403 -2.5 -3c-.019 -2.17 2.416 -2.954 2.5 -3c-1.023 -1.492 -2.951 -1.963 -3.5 -2c-1.433 -.111 -2.83 1 -3.5 1c-.68 0 -1.9 -1 -3 -1z"
                                    ></path>
                                    <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={`login-box-signup ${styles['login-box-signup']}`}> {/* Combine Bootstrap and CSS module classes */}
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
                <div className={`login-box-quotebox ${styles['login-box-quotebox']}`}> {/* Combine Bootstrap and CSS module classes */}
                    <div className={`quote-container ${styles['quote-container']}`}> {/* Combine Bootstrap and CSS module classes */}
                        <div className={`quote ${styles.quote}`}>Find Your Notes.</div> {/* Combine Bootstrap and CSS module classes */}
                        <div className={`quote-small ${styles['quote-small']}`}> {/* Combine Bootstrap and CSS module classes */}
                            "Are you tired of losing important notes? Look no further than CloudBook, your ultimate solution for hassle-free note storage and management in the cloud."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
