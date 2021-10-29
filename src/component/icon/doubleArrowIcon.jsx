import React from 'react';

const DoubleArrowIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-1400.028 -111.54)">
                <path d="M1400.028,111.54h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M1404.029,115.54h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M1412.029,123.54" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <g transform="translate(-1400.028 -111.54)">
                <path fill={fill !== undefined ? fill : '#fff'} d="M1404.917,131.54a.888.888,0,0,1-.628-1.517l6.483-6.483-6.483-6.483a.889.889,0,1,1,1.257-1.257l7.111,7.112a.889.889,0,0,1,0,1.257l-7.111,7.111A.889.889,0,0,1,1404.917,131.54Z" />
                <path fill={fill !== undefined ? fill : '#fff'} d="M1412.029,131.54a.888.888,0,0,1-.629-1.517l6.483-6.483-6.483-6.483a.889.889,0,1,1,1.257-1.257l7.111,7.112a.889.889,0,0,1,0,1.257l-7.111,7.111A.888.888,0,0,1,1412.029,131.54Z" />
            </g>
        </svg>
    );
});

export default DoubleArrowIcon;