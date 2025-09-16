import React, { useEffect, useState } from "react"
import Button from "components/Button";
import { usePlatforms } from "./Platform";


export default function Selector() {
    const platforms = usePlatforms();
    const [selected, setSelected] = useState(platforms.find(node => node.name === "windows"));
    useEffect(() => {
        const { userAgent } = navigator;
        for (let node of platforms) {
            if (userAgent.search(node.userAgent) === -1) continue
            setSelected(node);
            break;
        }
    }, [platforms])
    const rest = platforms.filter(node => node !== selected);

    return (
        <div>
            <details>
                <pre>
                    {JSON.stringify(platforms, null, 2)}
                </pre>
            </details>
            <Button href={`/download/${selected.name}`}>Download for {selected.title}</Button>
            <div>Also available for</div>
            <div>
                {rest.map(node => (
                    <div key={node.name}>
                        <Button secondary href={`/download/${node.name}`}>Download for {node.title}</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}