import { useEffect, useState ,Redirect} from 'react';
import { json } from 'react-router-dom';
import '../../styles/Header.css';

const   Header  = () =>{
   
   const [username,setUsername]= useState("");
   const [password,setPassword]=useState("");

   const [fullname,setFullname] = useState("");
   const [email,setEmail] = useState("");
   const [password1,setPassword1] = useState("");


   const subHander = (e)=>{
        e.preventDefault();
        console.log(username);
        console.log(password);
        fetch("http://localhost:4000/info/user",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                    fullname : username,
                    password : password
            
            })
        })
        .then(res =>res.json())
        .then(data =>{
           console.log(data);
           if(data.status === 200){
            alert("success");
             window.localStorage.setItem('user-name',username)
             window.localStorage.setItem('user-pass',password)
             window.location.reload(true)
           }
        })
        .catch((err)=>{
            alert("Invalid Username or Password");
        })

        setUsername(e.target.value="");
        setPassword(e.target.value="");
   }

   const subHander1 = (e)=>{
    e.preventDefault();
    console.log(fullname);
    console.log(email);
    console.log(password1);

    fetch("http://localhost:4000/info/create",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            fullname : fullname,
            password : password1,
            email:email
        })
    })
    .then(res =>res.json())
    .then(data =>{
       console.log(data);
       if(data.Status === 200){
        alert("success");
         
       }
       else{
        alert("not success");
       }
    })
    .catch((err)=>{
        alert("password must be greater than 8")
    })
    
    setFullname(e.target.value="");
    setEmail(e.target.value="");
    setPassword1(e.target.value="");
}

 function logout(){
    localStorage.clear();
    window.location.reload(true)
    
 }


      const gotohome = window.location.origin;
    return(
        <div className="container-fluid main-logo">
                <div id="logo-inside">
                   <a href={gotohome}  id="text-logo">e!</a>
                </div>
                {
                    localStorage.getItem('user-name')&&localStorage.getItem('user-pass')?
                      <div className='log-userinformation'>
                           <div className='user-name'>
                            <span className='user-name-exist'>{localStorage.getItem('user-name')}</span>    
                            <img src={require('../../Assests/profile.png')}  className="profile"></img>
                           </div>
                           <button className='btn btn-secondary bg-transparent border border-1 border-light' onClick={logout}>Logout</button>
                     </div>
                 :
         <div className='button-sign'>
                     <button className='btn btn-light bg-transparent border border-0' data-bs-toggle="modal" data-bs-target="#exampleModal" id="login">Login</button>
                     <button className='btn btn-secondary bg-transparent border border-1 border-light' data-bs-toggle="modal" data-bs-target="#exampleModal1">Create an account</button>
               
                     <div className="modal fade" id="exampleModal" tabindex="-1"  aria-hidden="true">
                         <div className="modal-dialog modal-dialog-centered" id="mo">
                            <div className="modal-content">
                                <div className="head">
                                    <div className="modal-title  md-title">Login</div>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                              <div className="modal-body">
  
                                    <form className='form-fill' onSubmit={subHander}>
                                             
                                                 <input type="text" placeholder='username' name='username'  className="user" value={username} onChange={(e)=>setUsername(e.target.value)} required></input><br/>
                
                                                <input type="password" placeholder='password' name='password' className="user" value={password} onChange={(e)=>setPassword(e.target.value)} required></input><br/>

                                                <input type='submit' name='submit' value="Login" className="submit"></input>
                                                
                                       </form>
                                  <hr/>
                               <p className='foot'>Don't have account?<a href="#" id="here">Sign Up</a></p>
                             </div>
        
                           </div>
                       </div>
                  </div>   


            <div class="modal fade" id="exampleModal1" tabindex="-1"  aria-hidden="true">
                 <div class="modal-dialog modal-dialog-centered" id="mo">
                       <div class="modal-content">
                            <div class="head">
                                <div class="modal-title md-title">Sign Up</div>
                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                         <div class="modal-body">

                            <form className='form-fill' onSubmit={subHander1}>
            
                                <input type="text" placeholder='fullname'  className="user" value={fullname} onChange={(e)=>{setFullname(e.target.value)}} required></input><br/>

            
                                <input type="email" placeholder='email'  className="user" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input><br/>

            
                                <input type="password" placeholder='password' className='user' value={password1} onChange={(e)=>{setPassword1(e.target.value)}} required></input><br/>

            

                                <input type='submit' name='submit' value="Register" className='submit'></input>



                            </form>
  
                       <hr/>
                       <p className='foot'>Already have account?<a href="#" id="here">Login</a></p>
                    </div>
                </div>
              </div>
           </div> 
                
               
               
                </div>
}
        </div>
    )
}

export default Header;