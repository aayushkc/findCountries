
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const IndividualCountry = (props) => {
    const [border, setBorder] = useState([])
    useEffect(() => {
        props.countries.map(item => {
            props.bordersArr?.map(bor => {

                if (bor === item.cca3) {
                    console.log(bor)
                    return setBorder(prev => [...prev, item.name.common])
                }

            }

            )

        })
    }, [props.bordersArr, props.countries])
    const borders = border.slice(border.length / 2).map((bor) => {

        return (
            <button className="back--btn" onClick={() => props.clickedCountry(bor)}>
                
                <Link to={`${bor}`} key={bor}>{bor}</Link>
            </button>
        )
    })
    return (
        <>
            <NavLink to="/">
                <button
                    onClick={props.showSearchAndSelect}
                    className={`back--btn ${props.isDarkMode ? "back--btn-dark" : "back--btn-light"}`}>
                    Back
                </button>
            </NavLink>
            <div className="individual-country--container">
                <div className="indi--left-img">
                    <img src={props.flag} alt={`${props.name} flag`} />
                </div>

                <div className={`indi--right-content ${props.isDarkMode ? "indi--dark" : ""}`}>
                    <h3 className="indi--right-title">{props.name}</h3>
                    <div className="data--wrapper">
                        <div className="right--data">
                            <p className="data--description"><span className="data--title">Navtive Name:</span> {props.nativeName}</p>
                            <p className="data--description"><span className="data--title">Population:</span> {props.population}</p>
                            <p className="data--description"><span className="data--title">Region:</span> {props.region}</p>
                            <p className="data--description"><span className="data--title">Capital:</span> {props.capital}</p>
                            <p className="data--description"><span className="data--title">Sub region:</span> {props.subregion}</p>
                        </div>
                        <div className="left--data">
                            <p className="data--description"><span className="data--title">Top Level Domain:</span> {props.tld}</p>
                            <p className="data--description"><span className="data--title">Curriencies:</span> {props.currencies}</p>
                            <p className="data--description"><span className="data--title">Languages:</span> {props.languages}</p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="data--description me-3"><span className="data--title">Borders:</span></p>
                        {
                            borders
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
export default IndividualCountry;