/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading';
import { IoArrowBackOutline } from 'react-icons/io5';
import Error from '../components/Error';
import '../../styles.css/btn.css'
import '../../styles.css/header.css'
import '../../styles.css/card.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const icon = <IoArrowBackOutline size={18} />;


function page(props) {
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(null);
  const country = props.params.country;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (country) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
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
  }, [country]);
  console.log(countryData.flags);


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
        <Error text="Country" msg={error.message} />
      </>
    )
  } else if (!countryData) {
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
        <Loading text="Country" />
      </>
    )
  } else {
    return (
      <>
        <div className="search-wrapper">
          <button
            onClick={() => router.back()}
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
              <div className="article-end">
                <h4>Border Countries:</h4>
                <div className="border-countries">
                  {countryData.borders?.map((border, index) => (
                    <div key={border}
                      onClick={
                        () => router.push(`/border/${border}`)
                      }
                    >
                      <h1>
                        {index > 0 && " "}
                        {border}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}
        {/* Render your country details using the countryData */}
      </>
    );
  }
}

export default page


