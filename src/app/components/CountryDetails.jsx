/* eslint-disable @next/next/no-img-element */
import React from 'react'
import '../../styles.css/card.css'

function CountryDetails({ countryData }) {
    console.log(countryData.name.common);
    return (
        <>
            <article>
                <aside className="article-flag">
                    <img src='{flag}' alt="" />
                </aside>
                <div className="article-main">
                    {/* <h3>{ countryData.name.common}</h3> */}
                    <div className="flex f-btw">
                        <div className="row">
                            <ol className="items">
                                <li>
                                    Native Name: <span>nativeName</span>
                                </li>
                                <li>
                                    Population: <span>population</span>
                                </li>
                                <li>
                                    Region: <span>region</span>
                                </li>
                                <li>
                                    Sub Region: <span>subregion</span>
                                </li>
                                <li>
                                    Capital: <span>capital</span>
                                </li>
                            </ol>
                        </div>
                        <div className="last-row">
                            <ol className="items">
                                <li>
                                    Top Level Domain: <span>topLevelDomain</span>
                                </li>
                                <li>
                                    Currencies: <span>currencies</span>
                                </li>
                                <li>
                                    Languages: <span>languages</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="article-end">
                        {/* <h4>Border Countries: </h4>
              {borders.map(border => (
                  <Link to={`/${name}/border/${border}`}><span>
                    {border}
                  </span></Link>
                ))} */}
                    </div>
                </div>
            </article>
        </>
    )
}

export default CountryDetails
