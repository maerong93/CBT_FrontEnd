import React from 'react';

const RefreshIcon = React.memo(({size, fill}) => {
    return(        
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-1044.687 -111.484)">
                <path d="M1044.687,111.484h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M1048.687,115.484h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M1056.687,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <path fill={fill !== undefined ? fill : '#fff'} d="M1058.894,119.929a.888.888,0,0,0,.889.889h3.555c.017,0,.031-.009.047-.01a.8.8,0,0,0,.095-.019.876.876,0,0,0,.747-.86v-3.556a.889.889,0,0,0-1.778,0v1.146a7.985,7.985,0,1,0,1.627,9.966.888.888,0,1,0-1.538-.889,6.229,6.229,0,1,1-1.042-7.556h-1.713A.888.888,0,0,0,1058.894,119.929Z" transform="translate(-1044.687 -111.484)" />
        </svg>
    );
});

export default RefreshIcon;