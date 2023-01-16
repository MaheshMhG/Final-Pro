import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import Layouts from './layout/Layouts.js';
import Placeorder from './Placeorder';
import Filter from './Filter';
import Detailitem from './Detailitem';



function App() {
  return (
      <BrowserRouter>
        <Layouts>
         <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/resturant/:resturant_id' element={<Placeorder/>}></Route>
          <Route path='/filter' element={<Filter/>}></Route>
          <Route path='/filter1/:resturant_id' element={<Detailitem/>}></Route>
         </Routes>
        </Layouts>
      </BrowserRouter>
  );
}

export default App;
