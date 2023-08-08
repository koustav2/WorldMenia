/* eslint-disable @next/next/no-img-element */
'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5';
import '../../../styles.css/btn.css'
import '../../../styles.css/header.css'
import '../../../styles.css/card.css'
import Loading from '@/app/components/Loading';
import Error from '@/app/components/Error';
const icon = <IoArrowBackOutline size={18} />;

function page(props) {
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(null);
  const border = props.params.border;
  const router = useRouter();
  console.log(border);

  useEffect(() => {
    const fetchData = async () => {
      if (border) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
          if (!response.ok) {
            throw new Error('API request failed'); // Handle non-OK responses
          }
          const result = await response.json();
          if (result && result.length > 0) {
            setCountryData(result[0]);
          } else {
            setError(new Error('No data found')); // Handle empty data
          }
        } catch (error) {
          setError(error); // Handle fetch errors
        }
      }
    };

    fetchData();
  }, [border]);
















  if (error) {
    return (
      <>
        <div className="search-wrapper">
          <button
            className="back-btn"
            onClick={() => router.back()}
          >
            {icon}
            Back
          </button>
        </div>
        <Error text="border" msg={error.message} />
      </>
    )
  } else if (!countryData) {
    return (
      <>
        <div className="search-wrapper">
          <button
            className="back-btn"
            onClick={() => router.push('/')}
          >
            {icon}
            Back
          </button>
        </div>
        <Loading text="border" />
      </>
    )
  } else {
    return (
      <>
        <div className="search-wrapper">
          <button
             onClick={() => router.push('/')}
            className="back-btn"
          >
            {icon}
            Back
          </button>
        </div>
        {countryData.length === 0 ? (
          <Loading text="Countries" />
        ) : (
          <article className='article '>
            <aside className="article-flag">
              <img src={countryData.flags?.png} alt={countryData.flags?.alt} />
            </aside>
            <div className="article-main">
              <h3>
                {countryData.name?.common}
              </h3>
              <div className="flex f-btw">
                <div className="row">
                  <ol className="items">
                    <li>
                      Native Name:
                      {Object.keys(countryData?.name.nativeName).map((languageCode, index) => (
                        <span key={languageCode}>
                          {index > 0 && ", "}
                          {countryData.name.nativeName[languageCode].common}
                        </span>
                      ))}
                    </li>
                    <li>
                      Population: <span>{countryData?.population}</span>
                    </li>
                    <li>
                      Region: <span>{countryData?.region}</span>
                    </li>
                    <li>
                      Sub Region: <span>{countryData?.subregion}</span>
                    </li>
                    <li>
                      Capital: <span>{countryData?.capital}</span>
                    </li>
                  </ol>
                </div>
                <div className="last-row">
                  <ol className="items">
                    <li>
                      Lat&Lon: <span>{countryData?.latlng}</span>
                    </li>
                    <li>
                      Currencies:
                      {Object.keys(countryData?.currencies).map((code, index) => (
                        <span key={code}>
                          {index > 0 && ", "}
                          {countryData.currencies[code].name} ({code})
                        </span>
                      ))}
                    </li>
                    <li>
                      Languages: {Object.values(countryData?.languages).map((language, index, arr) => (
                        <span key={language}>
                          {language}
                          {index < arr.length - 1 && ", "}
                        </span>
                      ))}
                    </li>
                  </ol>
                </div>
              </div>

            </div>
          </article>
        )}
        {/* Render your border details using the countryData */}
      </>
    );
  }
}

export default page
