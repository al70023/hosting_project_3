import React from 'react';
//import './Home.css';

function Home(){
    return(
        <div >
        <div class="homeTopContainer">
    
        <p class="text-lg mt-9">Welcome to Chick-fil-A!</p>
        <img class="mx-auto mt-24"src="https://upload.wikimedia.org/wikipedia/commons/0/02/Chick-fil-A_Logo.svg"/>
        </div>

        <div id="google_translate_element"></div>

        <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element') }
        </script>

        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

        
    </div>
    );
}

export default Home;

