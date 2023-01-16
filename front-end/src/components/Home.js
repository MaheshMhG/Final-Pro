import '../styles/Home.css';
import Imagescreen from './Imagescreen';
import Items from './Items.js';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
const Home = () => {
    return(
        <div>
         <Imagescreen/>
         <Items/>
        </div>
    )
};

export default Home