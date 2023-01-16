import {Component} from "react";
import '../styles/Items.css';

class Items extends Component {
    
    item() {
        const res = [
            {
                name : "BreakFast",
                url  : 'Breakfast.png',
                Description : "start your day with exclusive breakfast options"
            },
            {
                name : "Lunch",
                url  : 'Lunch.png',
                Description : "start your day with exclusive breakfast options"
            },
            {
                name : "Snacks",
                url  : 'Snacks.png',
                Description : "start your day with exclusive breakfast options"
            },
            {
                name : "Dinner",
                url  : 'Dinner.png',
                Description : "start your day with exclusive breakfast options"
            },
            {
                name : "Drinks",
                url  : 'Drinks.png',
                Description : "start your day with exclusive breakfast options"
            },
            {
                name : "Nightlife",
                url  : 'Night.png',
                Description : "start your day with exclusive breakfast options"
            }
        ]
        return res;
    }
    
    render() {       
        const result = this.item();
        return(
            <div className="container-fluid">
               <div className="container text-quick">
                    <h2 className="text1">Quick searches</h2>
                    <h5 className="text2">Discover restaurants by type of meals </h5>
               </div>
             <div className="container">
               <div className="row boxes">
                {result.map((content)=>(
                   <div className="card-items">
                        <div className="itm-box">
                            <img src={require('../Assests/' + content.url)} id="card-frontimg"></img>
                        </div>
                        <div className="itm-box-text">
                            <div className="itm-box-text1">{content.name}</div>
                            <div className="itm-box-text2">{content.Description}</div>
                            <a href="http://localhost:3000/filter"><button className="btn btn-primary">More...</button></a>
                        </div>
                    </div> 
                ))}
               </div>
            </div>
            </div>
        )
    }
}

export default Items;