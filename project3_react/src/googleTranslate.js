import React from 'react';
import { useRef, useEffect } from 'react';

const GoogleTranslate = () => {
    const backVisit = useRef(false);

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: 'en', 
                autoDisplay:false
        }, 
        "google_translate_element");
    };

    useEffect(() => {
        if (backVisit.current)return;


        var addScript = document.createElement("script");
        addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
        backVisit.current = true;
    },[])

    return (
        <>
            <div id = "google_translate_element"></div>
        </>
    );
    
};

export default GoogleTranslate;