import { useEffect, useState } from "react";

export const useRandomQuotes = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        let r_text = [];
        r_text[0] = 'Habits are like dominos. As one is formed, all others will follow!';
        r_text[1] = "A man who can't bear to share his habits is a man who needs to quit them.";
        r_text[2] = "The truth is that everyone is bored, and devotes himself to cultivating habits.";
        r_text[3] = "The chains of habit are too weak to be felt until they are too strong to be broken.";

        var i = Math.floor(r_text.length * Math.random());
        setText(r_text[i])
    }, [])

    return [text, setText];
};