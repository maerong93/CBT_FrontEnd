import React from 'react';

const ArrowIcon = React.memo(({size, fill}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
        <path d="M140.182,111.484h24v24h-24Z" transform="translate(-140.182 -111.484)" fill="none" opacity="0.1" />
        <path d="M144.182,115.484h16v16h-16Z" transform="translate(-140.182 -111.484)" fill="none" opacity="0.16" />
        <path d="M152.182,123.484" transform="translate(-140.182 -111.484)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path fill={fill !== undefined ? fill : "#fff"} d="M152.182,127.929a.886.886,0,0,1-.629-.261l-7.111-7.111A.889.889,0,1,1,145.7,119.3l6.483,6.483,6.482-6.483a.889.889,0,0,1,1.257,1.257l-7.111,7.111A.884.884,0,0,1,152.182,127.929Z" transform="translate(-140.182 -111.484)" />
    </svg>
));

export default ArrowIcon;