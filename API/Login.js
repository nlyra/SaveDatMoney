// app.post('/api/login', async (req, res, next) => 
// {
//   // incoming: login, password
//   // outgoing: id, firstName, lastName, error

//  var error = '';

//   const { login, password } = req.body;

//   const db = client.db();
//   const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

//   var id = -1;
//   var fn = '';
//   var ln = '';

//   if( results.length > 0 )
//   {
//     id = results[0].UserId;
//     fn = results[0].FirstName;
//     ln = results[0].LastName;
//   }

//   var ret = { id:id, firstName:fn, lastName:ln, error:''};
//   res.status(200).json(ret);
// });


//app.post('/api/login', async (req, res, next) => {  
    //     // incoming: login, password 
    //     // outgoing: id, firstName, lastName, error  
    //     var error = '';  
    //     const { login, password } = req.body;
    
    //     var id = -1;  
    //     var fn = '';
    //     var ln = '';  
    
    //     if (login.toLowerCase() == 'rickl' && password == 'COP4331' ){
    //         id = 1;    
    //         fn = 'Rick';    
    //         ln = 'Leinecker';  
    //     }  
    //     else {    
    //         error = 'Invalid user name/password';  
    //     }  
    
    //     var ret = { 
    //         id:id, 
    //         firstName:fn,
    //         lastName:ln,
    //         error:error
    //     };  
        
    //     res.status(200).json(ret);
    // });