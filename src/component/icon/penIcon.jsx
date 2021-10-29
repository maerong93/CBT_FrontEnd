import React from 'react';

const PenIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-303 -146)">
                <g>
                    <path d="M303,146h24v24H303Z" fill="none" opacity="0.1" />
                    <path d="M307,150h16v16H307Z" fill="none" opacity="0.16" />
                    <path d="M315,158" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </g>
            </g>
            <path fill={fill !== undefined ? fill : '#fff'} d="M322.74,153.816l-3.556-3.556a.889.889,0,0,0-1.257,0L307.26,160.927a.893.893,0,0,0-.26.629v3.555a.889.889,0,0,0,.889.889h3.555a.893.893,0,0,0,.629-.26l10.667-10.667A.889.889,0,0,0,322.74,153.816Zm-11.664,10.406h-2.3v-2.3l9.778-9.778,2.3,2.3Z" transform="translate(-303 -146)" />
        </svg>
    );
});

export default PenIcon;