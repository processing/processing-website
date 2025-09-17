import classNames from "classnames"
import React from "react";
import * as grid from 'styles/grid.module.css';
import * as css from 'styles/pages/donate.module.css';

export default function Donate() {
    return (
        <div style={{ flexBasis: 'var(--col4)', minHeight: 400, padding: "var(--gutter)" }} className={classNames(grid.col)}>
            Processing reached over 1 million people last year. If just 1% gave $5 a month, we’d raise $600,000 to support development. Your donation helps make Processing happen 💙
            <script
                src="https://donorbox.org/widget.js"
                paypalexpress="true"></script>
            <iframe
                title={"Donate to Processing"}
                className={css.donate}
                allowpaymentrequest=""
                src="https://donorbox.org/embed/support-processing?hide_donation_meter=true"></iframe>
        </div>
    )
}