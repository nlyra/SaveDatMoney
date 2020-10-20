import React, { useState } from 'react';

function Login(){    

    var loginName;    
    var loginPassword; 

    const [message,setMessage] = useState('');

    const doLogin = async event =>     
    {
        event.preventDefault();
        alert('doIt() ' + loginName.value + ' ' + loginPassword.value );
    };    
    return(     
        <div id="loginDiv"> 
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span>
                <br />
                <input type="text" id="loginName" placeholder="Username"   
                    ref={(c) => loginName = c} />
                <input type="password" id="loginPassword" placeholder="Password"
                    ref={(c) => loginPassword = c} />
                <br />        
                <input type="submit" id="loginButton" class="buttons" value = "Do It"          
                    onClick={doLogin} />        
            </form>        
            <span id="loginResult">{message}</span>     
        </div>
    );
};

export default Login;