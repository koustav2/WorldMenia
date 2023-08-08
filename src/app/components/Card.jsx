/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import '../../styles.css/card.css'



const Card = ({ item, id ,countryName}) => {
    return (
        <>
            <Link href={`/${countryName}`}>
                <div className="card" key={id}>
                    <div className="card-image">
                        <img src={item.flags.png} alt={item.name.common} />
                    </div>
                    <div className="card-content">
                        <h2 className="card-name">
                            {item.name.common}
                        </h2>
                        <ol className="card-list">
                            <li>population: <span>{item.population}</span></li>
                            <li>Region: <span>{item.region}</span></li>
                            <li>Capital: <span>{item.capital}</span></li>
                        </ol>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card

