import React,{useState} from "react";
import idPwd from "../idPwd.json";
// import {useNavigate} from 'react-router-dom';
import priKeys from "./privateKeys.json"
import { JSEncrypt } from "jsencrypt";


export default function Login2(){
    // const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username:"",password:""});
    function handleClick(input) { 
        setCredentials((prevCred)=>({...prevCred, [input.target.name]: input.target.value}))
        // console.log(credentials);
    }

    function handleSubmit(e){
        e.preventDefault();
        for (let index = 0; index < 5; index++) {
            let person = Object.keys(idPwd['id'][index])[0];
            let personPass = idPwd['id'][index][person];
            if(credentials.username == person && credentials.password == personPass){
                var encryptedData = localStorage.getItem(index);
                var privateKey = priKeys[credentials.password];
                console.log("encryptedData = "+encryptedData)
                var decrypt = new JSEncrypt();
                decrypt.setPrivateKey(privateKey);
                console.log("PrivateKey = " + privateKey);
                var uncrypted = decrypt.decrypt(encryptedData);
                console.log(uncrypted);
                alert(`The Data is: ${uncrypted}`)
        }else continue; 
        }
    }
    return(
        <div className="login-page">
        
        <h1>Generate Encrypted Data</h1>
        <div className='login-container'>
            <input type="text" value={credentials.username} onChange={handleClick} name="username"  placeholder="Username" className="login-input" />
            <input type={credentials.password} onChange={handleClick} name="password" placeholder="Password" className="login-input" />
        </div>
        <div className="btn-container">
            <button onClick={handleSubmit} className="login-btn">Submit</button>
        </div>
        </div>
    )
}