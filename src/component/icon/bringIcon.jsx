import React from 'react';

const BringIcon = ({size, fill}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
        <g transform="translate(-237.093 -111.484)">
            <path d="M237.093,111.484h24v24h-24Z" fill="none" opacity="0.1" />
            <path d="M241.093,115.484h16v16h-16Z" fill="none" opacity="0.16" />
            <path d="M249.093,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
        <g transform="translate(-237.093 -111.484)">
            <path fill={fill !== undefined ? fill : "#fff"} d="M256.2,120.818h-1.778a.889.889,0,0,0,0,1.778h.889v7.111H242.871V122.6h.889a.889.889,0,1,0,0-1.778h-1.778a.889.889,0,0,0-.889.889V130.6a.889.889,0,0,0,.889.888H256.2a.889.889,0,0,0,.889-.888v-8.889A.889.889,0,0,0,256.2,120.818Z" />
            <path fill={fill !== undefined ? fill : "#fff"} d="M248.465,128.113a.89.89,0,0,0,1.257,0l2.666-2.667a.889.889,0,1,0-1.257-1.257l-1.149,1.15v-8.966a.889.889,0,1,0-1.778,0v8.966l-1.149-1.15a.889.889,0,1,0-1.257,1.257Z" />
        </g>
    </svg>
);

export default BringIcon;
