import classNames from "classnames"
import React, { useEffect, useState } from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from './Donate.module.css';

export default function Donate() {
    const [interval, setInterval] = useState("m");
    const amounts = interval == "m" ? [5, 10, 25, 55] : [5, 10, 25, 55];
    const [amount, setAmount] = useState(10);

    const params = new URLSearchParams();
    params.append("amount", amount);
    params.append("hide_donation_meter", "true");
    params.append("default_interval", interval);
    const [origin, setOrigin] = useState("processing-website");
    const [source, setSource] = useState("processing-website");
    useEffect(() => {
        setOrigin(window.location.origin);
        setSource(window.location.hostname);
        window.DonorBox = { widgetLinkClassName: styles.donate };
        const body = document.body;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://donorbox.org/install-popup-button.js';
        script.id = 'donorbox-popup-button-installer';
        script.defer = true;
        body.appendChild(script);
    }, []);
    params.append("utm_content", JSON.stringify({ origin }));
    params.append("utm_source", source);
    params.append("utm_medium", "banner");
    params.append("utm_campaign", "donation_banner");

    const donorboxURL = `https://donorbox.org/support-processing?${params.toString()}`;


    function updateAmount(e) {
        // remove anything that is not a number
        const clean = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = `$${clean}`;
        const amount = parseInt(clean);
        if (isNaN(amount)) {
            return;
        }
        setAmount(amount);
    }


    return (
        <div style={{ flexBasis: 'var(--col3)', minHeight: 400 }} className={classNames(grid.col)}>
            <h2>Donate</h2>
            <p>
                Processing reached over 1 million people last year. If just 1% gave $5 a month, we’d raise $600,000 to support development. Your donation helps make Processing happen 💙
            </p>
            <div className={styles.action}>
                <div className={styles.intervalSelect}>
                    <div className={`${interval == "o" && styles.active} ${styles.interval}`} onClick={() => setInterval("o")}>
                        One Time
                    </div>
                    <div className={`${interval == "m" && styles.active} ${styles.interval}`} onClick={() => setInterval("m")}>
                        <div className={styles.star} /> Monthly
                    </div>
                </div>
                <div className={styles.amountSelect}>
                    {amounts.map((_amount, index) => (
                        <div className={`${styles.amount} ${amount == _amount && styles.active}`} key={index} onClick={() => setAmount(_amount)}>
                            ${_amount}
                        </div>
                    ))}
                    <input
                        className={`${styles.amount} ${styles.customamount} ${!amounts.includes(amount) && styles.active}`}
                        type="string"
                        placeholder="Other amount"
                        onClick={updateAmount}
                        onChange={updateAmount}
                    />
                </div>
                <a className={styles.donate} href={donorboxURL} target="_blank">
                    Donate Now
                </a>
            </div>
        </div>
    )
}