import React from 'react';

const FolderIcon = React.memo(({size, fill}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size !== undefined ? size : "24"} height={size !== undefined ? size : "24"} viewBox="0 0 24 24">
            <g transform="translate(-560.131 -111.484)">
                <path d="M560.131,111.484h24v24h-24Z" fill="none" opacity="0.1" />
                <path d="M564.131,115.484h16v16h-16Z" fill="none" opacity="0.16" />
                <path d="M572.131,123.484" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
            <g transform="translate(-560.131 -111.484)">
                <path d="M578.353,120.393h-8a.889.889,0,0,1-.628-.26l-.629-.629h-3.187v2.667h12.444Z" fill="none"/>
                <rect width="12.444" height="4.444" transform="translate(565.909 123.949)" fill="none"/>
                <path fill={fill !== undefined ? fill : '#fff'} d="M579.242,118.615h-8.521l-.628-.628a.889.889,0,0,0-.629-.261H565.02a.889.889,0,0,0-.889.889v10.667a.889.889,0,0,0,.889.889h14.222a.889.889,0,0,0,.889-.889V119.5A.889.889,0,0,0,579.242,118.615Zm-13.333.889H569.1l.629.629a.889.889,0,0,0,.628.26h8v1.778H565.909Zm12.444,8.889H565.909v-4.444h12.444Z" />
            </g>
        </svg>
    );
});

export default FolderIcon;