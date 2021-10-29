import React from 'react';

const PlusIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-1303.117 -111.484)">
                <path d="M1303.117,111.484h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M1307.117,115.484h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M1315.117,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <path fill={fill !== undefined ? fill : "#fff"} d="M1322.228,122.6h-6.222v-6.222a.889.889,0,1,0-1.778,0V122.6h-6.222a.889.889,0,1,0,0,1.778h6.222V130.6a.889.889,0,1,0,1.778,0v-6.222h6.222a.889.889,0,0,0,0-1.778Z" transform="translate(-1303.117 -111.484)" />
        </svg>
    );
});

export default PlusIcon;