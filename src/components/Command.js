import React, { useState } from "react"
import * as css from "./Command.module.css"

export default function Command({ command }) {
    const [feedback, setFeedback] = useState("");
    function copyToClipboard() {
        navigator.clipboard.writeText(command);
        setFeedback("Copied!");
        setTimeout(() => setFeedback(""), 2000);
    }
    return (
        <pre className={css.pre}>
            {command}
            <span className={css.spacer}>
                {feedback}
            </span>
            <svg className={css.icon} onClick={copyToClipboard} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33464 21.3333C3.86797 21.3333 2.66797 20.1333 2.66797 18.6666V5.33329C2.66797 3.86663 3.86797 2.66663 5.33464 2.66663H18.668C20.1346 2.66663 21.3346 3.86663 21.3346 5.33329M13.3346 10.6666H26.668C28.1407 10.6666 29.3346 11.8605 29.3346 13.3333V26.6666C29.3346 28.1394 28.1407 29.3333 26.668 29.3333H13.3346C11.8619 29.3333 10.668 28.1394 10.668 26.6666V13.3333C10.668 11.8605 11.8619 10.6666 13.3346 10.6666Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </pre>
    )
}