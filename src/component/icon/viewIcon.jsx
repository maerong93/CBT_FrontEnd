import React from 'react';

const ViewIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-463.219 -111.484)">
                <path d="M463.219,111.484h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M467.219,115.484h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M475.219,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <g transform="translate(-463.219 -111.484)">
                <path d="M479.16,122.344a5.081,5.081,0,1,0-5.081,5.081A5.088,5.088,0,0,0,479.16,122.344Z" fill="none"/>
                <path fill={fill ? fill : '#fff'} d="M482.959,129.967l-3.45-3.449a6.882,6.882,0,1,0-1.257,1.257l3.45,3.449a.889.889,0,0,0,1.257-1.257ZM469,122.344a5.081,5.081,0,1,1,5.082,5.081A5.088,5.088,0,0,1,469,122.344Z" />
            </g>
        </svg>
    );
});

export default ViewIcon;