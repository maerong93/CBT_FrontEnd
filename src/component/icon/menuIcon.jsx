import React from 'react';

const MenuIcon = React.memo(({size, fill}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
        <g transform="translate(-1076.991 -111.484)">
            <path d="M1076.991,111.484h24v24h-24Z" fill="none" opacity="0.1" />
            <path d="M1080.991,115.484h16v16h-16Z" fill="none" opacity="0.16" />
            <path d="M1088.991,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
        <g transform="translate(-1076.991 -111.484)">
            <path  fill={fill !== undefined ? fill : "#fff"} d="M1096.1,119.04H1081.88a.889.889,0,1,1,0-1.778H1096.1a.889.889,0,0,1,0,1.778Z" />
            <path  fill={fill !== undefined ? fill : "#fff"} d="M1096.1,129.707H1081.88a.889.889,0,1,1,0-1.778H1096.1a.889.889,0,0,1,0,1.778Z" />
            <path  fill={fill !== undefined ? fill : "#fff"} d="M1096.1,124.373H1081.88a.889.889,0,1,1,0-1.777H1096.1a.889.889,0,1,1,0,1.777Z" />
        </g>
    </svg>
));

export default MenuIcon;