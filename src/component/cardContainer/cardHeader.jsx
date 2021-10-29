import React from 'react';
import styles from './cardContainer.module.css';

const CardHeader = React.memo(({title}) => {
    return(
        <div className={styles.cardTitle}>
            <span>{title}</span>
            <button type="button" className={`${styles.close} tab-control-btn`}>
                <svg className="tab-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g className="tab-svg" transform="translate(24 24) rotate(180)">
                        <path className="tab-svg" d="M0,0H24V24H0Z" fill="none" opacity="0.1" />
                        <path className="tab-svg" d="M0,0H16V16H0Z" transform="translate(4 4)" fill="none" opacity="0.16" />
                        <path className="tab-svg" d="M0,0" transform="translate(12 12)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path className="tab-svg" d="M8,8.889a.886.886,0,0,1-.629-.261L.26,1.517A.889.889,0,0,1,1.517.26L8,6.743,14.482.26a.889.889,0,0,1,1.257,1.257L8.628,8.628A.885.885,0,0,1,8,8.889Z" transform="translate(4 7.556)" fill="#fff"/>
                    </g>
                </svg>
            </button>
        </div>
    )
});

export default CardHeader;