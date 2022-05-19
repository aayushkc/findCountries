import { NavLink } from "react-router-dom";
const SearchCountries = (props) =>{
    return (
        <article onClick={()=>props.clickedCountry(props.name)}>
            <div className="col">
        <NavLink to={`country/${props.name}`}>
        <div className="card">
        <img src={props.flag} alt={`${props.name} flag`} className="card-img-top" />
        <div className="card-body">
            <h3 className="card--title">{props.name}</h3>

            <p className="data--description"><span className="data--title">Population:</span> {props.population}</p>
            <p className="data--description"><span className="data--title">Region:</span> {props.region}</p>
            <p className="data--description"><span className="data--title">Capital:</span> {props.capital}</p>

        </div>
    </div>
    </NavLink>
    </div>
    </article>
    )
}
export default SearchCountries;