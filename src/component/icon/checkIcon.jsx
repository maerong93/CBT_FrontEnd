import React from 'react';

const CheckIcon = React.memo(({size, fill}) => {
    return(
        
<svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
    <g transform="translate(-75 -146)">
        <path d="M75,146H99v24H75Z" fill="none" opacity="0.1" />
        <path d="M79,150H95v16H79Z" fill="none" opacity="0.16" />
        <path d="M87,158" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    </g>
    <path fill={fill !== undefined ? fill : '#fff'} d="M85.286,162.286a.854.854,0,0,1-.606-.251l-3.429-3.429a.857.857,0,0,1,1.212-1.212l2.823,2.823,6.251-6.252a.857.857,0,0,1,1.212,1.212l-6.857,6.858A.857.857,0,0,1,85.286,162.286Z" transform="translate(-75 -146)" />
</svg>
    )
    
});

export default CheckIcon;