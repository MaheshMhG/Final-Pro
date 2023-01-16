import Header from './Header.js';
const Layouts = (props) => {
    return(
        <div>
            <Header/>
            {props.children}
        </div>

    )
}
export default Layouts;