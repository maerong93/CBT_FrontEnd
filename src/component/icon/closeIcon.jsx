import React from 'react';

const CloseIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-140 -146)">
                <g>
                <path fill="none" opacity="0.1" />
                <path d="M144,150h16v16H144Z" fill="none" opacity="0.16" />
                <path d="M152,158" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </g>
            </g>
            <path fill={fill !== undefined ? fill : '#fff'} d="M153.212,158l4.537-4.537a.857.857,0,0,0-1.212-1.212L152,156.788l-4.537-4.537a.857.857,0,0,0-1.212,1.212L150.788,158l-4.537,4.537a.857.857,0,0,0,1.212,1.212L152,159.212l4.537,4.537a.857.857,0,0,0,1.212-1.212Z" transform="translate(-140 -146)" />
        </svg>
    );
});

export default CloseIcon;