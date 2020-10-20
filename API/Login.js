app.post('/api/login', async (req, res, next) => {  
    // incoming: login, password 
    // outgoing: id, firstName, lastName, error  
    var error = '';  
    const { login, password } = req.body;

    var id = -1;  
    var fn = '';
    var ln = '';  

    if (login.toLowerCase() == 'rickl' && password == 'COP4331' ){
        id = 1;    
        fn = 'Rick';    
        ln = 'Leinecker';  
    }  
    else {    
        error = 'Invalid user name/password';  
    }  

    var ret = { 
        id:id, 
        firstName:fn,
        lastName:ln,
        error:error
    };  
    
    res.status(200).json(ret);
});