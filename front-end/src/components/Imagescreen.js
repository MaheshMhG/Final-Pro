import { useEffect, useState } from 'react';
import '../styles/imagescreen.css';

const Imagescreen = () =>{
    
    const [data,setData] = useState([]);
    const [resname,setResname] = useState([]);
    function  locationsdrop(){
        
        const apiurl = "http://localhost:4000/info/locationinfo";

        fetch(apiurl).then(response => response.json())
        .then(data => setData(data.data))
    }
    
    function changelocation(event){
        let current_loc_key = event.target.value;
        console.log(current_loc_key);

        fetch("http://localhost:4000/info/resturantname1/"+current_loc_key)
        .then(res => res.json())
        .then(resname => setResname(resname.data))
    }

    function resturant_change(e){
        const value1 = e.target.value;

        window.location.href = window.location.origin + '/resturant/' + value1;
    }
    useEffect(()=>{
       locationsdrop()
    },[])
    
    
    return (
        <div className="container-fluid p-0">
             <div className="container-fluid p-0" id="img">
                <div className='logo'>
                     <div className='logo-edu'>
                         <h6  className='logo-edu-inside' >e!</h6>
                     </div>
                </div>
                

                <div className='title-text'>
                   <h4 id='title-text-inside'>Find the best restaurants,cafes,and bars</h4>
               </div>

               <div className='type-text-search'>
                <div className='type-text1'>
                  <div><select  className="loc-dropdown checkbox-items" onChange={changelocation}>
                        <option value='' selected disabled >please select the location</option>
                        {data.map(loc => (
                            <option value={loc.id} key={loc.id}>{loc.location}</option>
                        ))}
                        </select>
                
                </div>
               </div>

               <div className='type-text2'>
                  <div><select  className="res-dropdown checkbox-items" onChange={resturant_change}>
                        <option value='' selected disabled>please select the resturant</option>
                        {resname.map(rname => (
                            <option value={rname.resturant_id} key={rname.resturant_id}>{rname.resturant_name}</option>
                        ))}
                        </select>
                
                </div>
               </div>
             </div>         
             </div>
       </div>

    )
};

export default Imagescreen;