import React from 'react';

const WriteIcon = React.memo(({size, fill}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 32 32">
        <g transform="translate(-10 -238)">
            <path d="M10,238H42v32H10Z" fill="none" opacity="0.1" />
            <path d="M14,242H38v24H14Z" fill="none" opacity="0.16" />
            <g>
                <path fill={fill !== undefined ? fill : "#fff"} d="M28.769,254.923H26a.923.923,0,0,1-.923-.923v-2.769a.923.923,0,0,1,.27-.653l8.308-8.308a.923.923,0,0,1,1.305,0l2.77,2.77a.923.923,0,0,1,0,1.305l-8.308,8.308A.923.923,0,0,1,28.769,254.923Zm-1.846-1.846h1.464l7.385-7.385-1.464-1.464-7.385,7.385Z" />
                <path fill={fill !== undefined ? fill : "#fff"} d="M34.308,266H14.923a.923.923,0,0,1-.923-.923V245.692a.923.923,0,0,1,.923-.923h9.692a.923.923,0,0,1,0,1.846H15.846v17.539H33.385v-8.769a.923.923,0,0,1,1.846,0v9.692A.923.923,0,0,1,34.308,266Z" />
            </g>
        </g>
    </svg>
));

export default WriteIcon;