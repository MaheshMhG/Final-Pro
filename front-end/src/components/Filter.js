import { Component } from "react";
import '../styles/Filter.css';
class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {
            resturantname1:[],
            currentpage:[1],
            perpage:[],
            location:[],
            pageNumber:[1,2],
            filterChange:false,
            value:0,
            filterdata:[]
        }
    }


    componentDidMount(){
       this.locationdropfilter();
      // this.pagen()
    }
  
    filterList(){

        console.log(" filter List");
        const cusine = document.querySelectorAll('input[name=cuisine]:checked');
        const cost = document.querySelectorAll('input[name=cost]:checked');
        const sort = document.querySelectorAll('input[name=sort]:checked');
        console.log(cusine[0].id);
        console.log(cost[0].id);
        console.log(sort[0].id);

        fetch('http://localhost:4000/info/sorting/'+ this.state.value + '/' + cusine[0].id + '/' + cost[0].id)
        .then(res=>res.json())
        .then(data=>this.setState({filterdata:data.data}))


       
    }
         

    
    componentDidUpdate(pP,pS){
        this.changelocationfilter()
        if(this.state.filterChange){
            this.filterList()
            this.setState({
                filterChange:false,

            })
        }
      
    }

    locationdropfilter(){
        const apiurl = "http://localhost:4000/info/locationinfo";

        fetch(apiurl).then(response => response.json())
        .then(data => this.setState({location:data.data}))
    }

    changelocationfilter(){
        console.log(this.state.value,":values");
        fetch("http://localhost:4000/info/resturantname1/"+this.state.value)
        .then(res => res.json())
        .then(resname => this.setState({resturantname1:resname.data})) 

      //  const indexendpage = currentpage*

     // this.setState({pageNumber:(Math.ceil(this.state.resturantname1.length/2))})


    }

    placeorder(id){
        console.log(  id ,"placeorder button is clicked");

        window.location.href = window.location.origin + '/filter1/' + id;
    }
 
    render(){
        
        const filtered = ()=>{
            this.setState({
                filterChange:true
            })
        }

        const pagemove = (page)=>{
          console.log(page,"page");

         
          if(page === 1){
            this.setState({perpage:this.state.resturantname1.slice(0,2)});
           
          }

          if(page === 2){
            this.setState({perpage:this.state.resturantname1.slice(2,4)});
           
          }
        }
    
       
       
      
        return(
            <div className="row">
                <div className="filter col-4 my-5 ms-5">
                    <label  className="select-body">Select location</label>
                    <select  className='sel-itm' name="filter-location" onChange={(e)=>this.setState({value:e.target.value})}>
                    <option value='' selected disabled >please select the location</option>
                    {this.state.location.map(loc => (
                            <option value={loc.id} key={loc.id} className='checkbox-items'>{loc.location}</option>
                        ))}
                    </select>
                    <label className="Cuisine-item">Cuisines</label>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input cusine1" name="cuisine" id="1"/>
                        <label className="form-check-label  checkbox-items" htmlFor="1">North Indian</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="cuisine" id="2"/>
                        <label className="form-check-label checkbox-items" htmlFor="2">South Indian</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="cuisine" id="3"/>
                        <label className="form-check-label checkbox-items" htmlFor="3">fast Food</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="cuisine" id="4"/>
                        <label className="form-check-label checkbox-items" htmlFor="4">Any</label>
                    </div>

                    <label className="Cuisine-item">Cost</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="cost" id="lte"/>
                        <label className="form-check-label checkbox-items" htmlFor="lt">Less than 500</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="cost" id="gte"/>
                        <label className="form-check-label checkbox-items" htmlFor="gt">Greater than 500</label>
                    </div>
                    
                    <label className="cuisine-item">Sort by</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="sort" id="1"/>
                        <label className="form-check-label checkbox-items" htmlFor="lt">Prices high to low</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="sort" id="-1"/>
                        <label className="form-check-label checkbox-items" htmlFor="gt">Prices low to high</label>
                    </div>    

                    <button type='button' className="btn btn-primary apply" onClick={filtered}>Apply</button>
                </div>
                {this.state.filterdata.length > 0?
        
                 <div className="col-7 gettingdata">
                      {
                        this.state.filterdata.map(dt=>(
                            <div class="container border border-light li-item">
                            <div className="li-item-inside">
                                <div>
                                    <img className="img" src={"http://localhost:4000/info/images/" + dt.image}/>
                                </div>
                                <div class="big-item">
                                    <div className="rest-name">{dt.resturant_name}</div>
                                    <div className="rest-location">{dt.location_name}</div>
                                    <button className="btn btn-primary"  value={dt.resturant_id} key={dt.resturant_id} onClick={()=>this.placeorder(dt.resturant_id)}>Order</button>

                                </div>
                            </div>
                            <hr />
                            <div>
                                <div class="margin-left">
                                    <div className="Bakery">CUISINES : <span className="bakery-inside">{dt.cusine}</span></div>
                                    <div className="Bakery">COST FOR TWO :<span className="bakery-inside">{dt.cost}</span></div>
                                </div>
                            </div>
                
                         </div>
                        ))
                    }
                </div>    
                    
                :

            
                 <div className="col-7 gettingdata">
                      {
                        this.state.perpage.map(dt=>(
                            <div class="container border border-light li-item">
                            <div className="li-item-inside">
                                <div>
                                    <img className="img" src={"http://localhost:4000/info/images/" + dt.image}/>
                                </div>
                                <div class="big-item">
                                    <div className="rest-name">{dt.resturant_name}</div>
                                    <div className="rest-location">{dt.location_name}</div>
                                    <button className="btn btn-primary"  value={dt.resturant_id} key={dt.resturant_id} onClick={()=>this.placeorder(dt.resturant_id)}>Order</button>

                                </div>
                            </div>
                            <hr />
                            <div>
                                <div class="margin-left">
                                    <div className="Bakery">CUISINES : <span className="bakery-inside">{dt.cusine}</span></div>
                                    <div className="Bakery">COST FOR TWO :<span className="bakery-inside">{dt.cost}</span></div>
                                </div>
                            </div>
                
                        </div>
                        ))
                      }
                       
                       <center>
                            {
                               this.state.pageNumber.map(page =>(
                                <button  className='pagebtn' key={page} onClick={()=>pagemove(page)}>{page}</button>
                               ))
                            }
                     </center>
                </div>
             
              }
            </div>
        )
    }
}

export default Filter;