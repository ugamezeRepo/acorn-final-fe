import { useEffect, useRef, useState } from "react";
import twemoji from "twemoji";

const TwemojiTestPage = () => {
    const ref = useRef(null);
    const [parsed, setParsed] = useState("");

    useEffect(() => {
        if (ref.current) {
            const text = ref.current.innerHTML;
            const parsedText = twemoji.parse(text);
            setParsed(parsedText);
        }
    }, [ref]);

    return (
        <>
            <div ref={ref}>
                I &#x2764;&#xFE0F; emoji!
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: parsed }} />
            </div>
        </>
    );
};

export { TwemojiTestPage };
