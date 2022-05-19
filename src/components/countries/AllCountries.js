import Search from '../Search';
import Select from '../Select';
import Loading from '../Utilities/Loading';
const AllCountries = (props) =>{
        return (
            <>
            <div className='section--top'>
                    <Search onInputChange={props.getInputChange} isDarkMode ={props.isDarkMode} searchInput={props.searchInput}/>
                    <Select optionChange={props.optionChange} isDarkMode ={props.isDarkMode}/>
                </div>
                {props.isLoading ? <Loading/> :<>
                    
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {props.country}
                    </div></>}
            </>
      
        
     
        )
}

export default AllCountries;