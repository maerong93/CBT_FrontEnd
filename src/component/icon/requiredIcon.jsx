import React from 'react';

const RequiredIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-10.967 -146.503)">
                <path d="M10.967,146.5h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M14.967,150.5h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M22.967,158.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <path fill={fill !== undefined ? fill : '#fff'} d="M26.933,157.612a.8.8,0,0,0-1-.537l-2.17.649V155.7a.8.8,0,1,0-1.6,0v2.021L20,157.075a.8.8,0,0,0-.458,1.533l2.071.619-1.248,1.58a.8.8,0,0,0,1.256.992l1.35-1.71,1.349,1.71a.8.8,0,1,0,1.256-.992l-1.247-1.58,2.071-.619A.8.8,0,0,0,26.933,157.612Z" transform="translate(-10.967 -146.503)" />
        </svg>
    );
});

export default RequiredIcon;