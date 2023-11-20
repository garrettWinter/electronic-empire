'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const router = useRouter();
    const searchBar = useRef('');

    const searchRedirect = () => {
        //This if statment is preventing the search function from running when empty
        if (searchBar.current === '') { return };

        let searchTerm = ('/products/search/' + searchBar.current);
        //This push will redirect the user to the inputed search term
        router.push(searchTerm);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '50px' }}>
            <p style={{ fontWeight: 'bolder' }}>Product Search:</p>
            <input
                name='searchBar'
                id='searchBar'
                onChange={(e) => (searchBar.current = e.target.value)}
                style={{
                    height: '25px',
                    margin: '0px 5px',
                }}
            ></input>
            <button style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '0px 10px'
            }}
                onClick={searchRedirect}>Search</button>
        </div>
    )

};