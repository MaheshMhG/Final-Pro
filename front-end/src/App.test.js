/*
  <center>
                            {
                               this.state.pageNumber.map(page =>(
                                <button  className='pagebtn' key={page} onClick={()=>pagemove(page)}>{page}</button>
                               ))
                            }
                     </center>
                        const pagemove = (page)=>{
          console.log(page,"page");

         
          if(page === 1){
            this.setState({perpage:this.state.resturantname1.slice(0,2)});
           
          }

          if(page === 2){
            this.setState({perpage:this.state.resturantname1.slice(2,4)});
           
          }
        }
*/
