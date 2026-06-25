import classNames from "classnames"
import React, { useEffect, useState } from "react";
import * as grid from 'styles/grid.module.css';
import * as styles from './Donate.module.css';
import { usePlatform } from "./download/Platform";

export default function Donate() {
    const [interval, setInterval] = useState("m");
    const amounts = interval !== "m" ? [5, 10, 20, 25, 50, 100, 500] : [5, 10, 20, 25, 50, 100, 500];
    const [amount, setAmount] = useState(10);
    const platform = usePlatform();

    const params = new URLSearchParams();
    params.append("amount", amount);
    params.append("hide_donation_meter", "true");
    params.append("default_interval", interval);
    const [origin, setOrigin] = useState("processing-website");
    const [source, setSource] = useState("processing-website");
    useEffect(() => {
        setOrigin(window.location.origin);
        setSource(window.location.href);
        window.DonorBox = { widgetLinkClassName: styles.donate };
        const body = document.body;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://donorbox.org/install-popup-button.js';
        script.id = 'donorbox-popup-button-installer';
        script.defer = true;
        body.appendChild(script);
    }, []);
    params.append("utm_content", JSON.stringify({ origin, platform }));
    params.append("utm_source", source);
    params.append("utm_medium", "donation-box");
    params.append("utm_campaign", "website");

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
        <div className={classNames(grid.col, styles.container)}>

            <div className={styles.action}>
                <h3>Support Processing</h3>
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
                <a className={styles.info} href="https://processingfoundation.org/donate" target="_blank">
                    Where does my donation go?
                </a>
                <p className={styles.about}>
                    Processing is <strong>free</strong> and <strong>open source.</strong> If you rely on it, please consider donating to help keep it maintained and accessible for everyone.
                </p>
            </div>
        </div>
    )
}