'use client'

import Image from 'next/image'
import Header from './components/Header'
import '../styles.css/search.css'
import React, { useState, useEffect } from 'react';
import { API_URL, API_URL_REGION } from '../../api';
import Loading from './components/Loading';
import Error from './components/Error';
import { useRouter } from 'next/navigation';
import Card from './components/Card';
import '../styles.css/card.css'
import Link from 'next/link';
import { SearchBar, search, useDebounce } from '@/utils/utils';




export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const debouncedSearch = useDebounce(q);
  const [c, setC] = useState('All');  // Add this state for region filtering
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = API_URL; // Default URL for fetching all countries
        if (c !== "All") {
          apiUrl = `https://restcountries.com/v3.1/region/${c}`; // Use region-specific URL if a region is selected
        }
        const response = await fetch(apiUrl);
        const result = await response.json(); // Log the fetched data

        if (Array.isArray(result)) {
          setItems(result);
        } else {
          setItems([]);
        }
        setIsLoaded(true);
      } catch (error) {
        setError(error);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [c, debouncedSearch]);







  if (error) {
    return (
      <>
        <Error text="Countries" msg={error.message} />
      </>
    )
  } else {
    return (
      <>
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <SearchBar q={q} setq={setQ} />
            <span className="sr-only">
              Search countries here
            </span>
          </label>
          <div className='select ' >
            <select
              onChange={e => {
                setC(e.target.value);
              }}
              className="custom-select" aria-label="Filter Countries By Countries">
              <option value="All">Filter by Region</option>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>
        {items.length === 0 ? (
          <Loading text="Countries" />
        ) : (
          <>
            <ul className="card-grid">
              {search(items, q, c).map(item => (
                <li key={item.ccn3}>
                  {/* Render your Card component here */}
                  <Card item={item} id={item.ccn3} countryName={item.name.common} />
                </li>
              ))}
            </ul>
            <div className="marginBtm"></div>
          </>
        )}
      </>
    );
  }
}




