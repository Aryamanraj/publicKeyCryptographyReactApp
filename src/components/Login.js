import React,{useState} from "react";
import idPwd from "../idPwd.json";
import {useNavigate} from 'react-router-dom';
import pubKeys from "./publicKeys.json"
import { JSEncrypt } from "jsencrypt";

export default function Login(){
    //const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username:"",password:""});

    function handleClick(input) { 
        setCredentials((prevCred)=>({...prevCred, [input.target.name]: input.target.value}))
        // console.log(credentials);
    }

    function handleSubmit(e){
        e.preventDefault();
        for (let index = 0; index < 5; index++) {
            let person = Object.keys(idPwd['id'][index])[0];
            if(credentials.username == person){
                for(let indexing = 0; indexing < 5; indexing++){
                    var encrypt = new JSEncrypt();
                    var publicKey = pubKeys[indexing];
                    encrypt.setPublicKey(publicKey);
                    var encrypted = encrypt.encrypt(`${credentials.password}`);
                    localStorage.setItem(indexing, encrypted);
                    console.log(`indexing = ${indexing}\n` + `uploaded data: ${localStorage.getItem(indexing)}`);
                }
            }else continue; 
        }
    }

    return(
        <div className="login-page">
        
        <h1>Send Message</h1>
        <div className='login-container'>
            <input type="text" value={credentials.username} onChange={handleClick} name="username"  placeholder="Username" className="login-input" />
            <input type={credentials.password} onChange={handleClick} name="password" placeholder="Pass Phrase" className="login-input" />
        </div>
        <div className="btn-container">
            <button onClick={handleSubmit} className="login-btn">Submit</button>
        </div>
        </div>
    )
}