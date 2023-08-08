'use client'
import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};


export function SearchBar({ q, setq }) {
    return (
        <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={q}
            onChange={(e) => setq(e.target.value)}
        />

    );
}
export function search(items, q, c) {
    return items.filter(row => {
        if (c === 'All' || row.region === c) {

            const nameMatch = row.name.common.toLowerCase().indexOf(q.toLowerCase()) > -1;
            const capitalMatch = row.capital && row.capital[0] && row.capital[0].toLowerCase().indexOf(q.toLowerCase()) > -1;
            return nameMatch || capitalMatch;
        }
        return false;
    });
}