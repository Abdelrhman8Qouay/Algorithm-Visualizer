

/* Generate JS file
    This file for semi dynamic page to generate the main contents
    in the pages at: home, ..pages, etc...
*/

document.addEventListener('DOMContentLoaded', () => { 

    // --- First Operations ========================================================================================
    // head links ============================================
    var generate_css = ()=> {
        const pathname = window.location.pathname;

        var link = document.createElement( "link" );
        if(currIsHome(pathname)) {
            link.href = "assets/css/main.css";
        } else {
            link.href = "../assets/css/main.css";
        }
        link.type = "text/css";
        link.rel = "stylesheet";
        // link.media = "screen,print";

        document.getElementsByTagName( "head" )[0].appendChild( link );
    }
    generate_css();
    var generate_google_icons = ()=> {
        var link = document.createElement( "link" );
        link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
        link.rel = "stylesheet";

        document.getElementsByTagName( "head" )[0].appendChild( link );
    }
    generate_google_icons();


    // navbar element ============================================
    const nav = `    <nav class="navbar">
                        <div class="container">
                            <div class="logo">
                                <img width="50" height="50" src="${getDynamicURL('logo.svg', 'assets')}" alt="Algorithm Visualizer Logo" class="logo">
                                <span class="nav-title">Algo Visualizer</span>
                            </div>
                            <ul class="nav-links">
                                <li><a href="${changeNavURL('home')}">Home</a></li>
                                <li><a href="#algorithms">Algorithms</a></li>
                                <li><a href="${changeNavURL('about')}">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <button id="themeBtn" class="theme-toggle">
                                    <i class="material-icons" id="theme-icon">wb_sunny</i>
                                </button>
                            </ul>
                        </div>
                    </nav>
`;
    const navEl = document.querySelector('.navEl');
    navEl.innerHTML = nav;



    // footer element ============================================
    var currYear = new Date().getFullYear();
    const footer = `<footer class="footer">
                        <div class="container">
                            <p>&copy; ${currYear} Algorithm Visualizer. All Rights Reserved. <br /> <a href="#ff" target="_blank">Abdelrhman Ashraf</a> Made it.</p>
                        </div>
                    </footer>`;
    const footerEl = document.querySelector('.footerEl');
    footerEl.innerHTML = footer;


    // --- Additional Operations ========================================================================================
    // Actions To Do ============================================

    // theme toggle ------
    const themeToggleButton = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleButton.children[0].innerHTML = currentTheme == 'light' ? 'wb_sunny' : 'nights_stay';
    // Toggle theme when button is clicked
    themeToggleButton.addEventListener('click', () => {
        themeToggle('data-theme');
        themeToggleButton.children[0].innerHTML = currentTheme == 'light' ? 'wb_sunny' : 'nights_stay';
    });

});



// console.log(currIsHome(window.location.pathname));




// functions used ============================================ ==========================
// change the nav urls to the correct path
function changeNavURL(name) {
    const pathname = window.location.pathname;
    var genURL = '';
    if(name == 'home') {
        if(currIsHome(pathname)) {
            genURL= 'index.html';
        } else {
            genURL= '../index.html';
        }
    }
    else if(name == 'about') {
        if(currIsHome(pathname)) {
            genURL= 'pages/about.html';
        } else {
            genURL= 'about.html';
        }
    }
    return genURL;
}

// get the correct url of the files from [specific] folders (dynamically)
function getDynamicURL(fileName, folderName) {
    const pathname = window.location.pathname;
    var genURL = '';
    if(folderName == 'assets') {
        if(currIsHome(pathname)) {
            genURL= 'assets/'+fileName;
        } else {
            genURL= '../assets/'+fileName;
        }
    }
    else if(folderName == 'pages') {
        if(currIsHome(pathname)) {
            genURL= 'pages/'+fileName;
        } else {
            genURL= '../pages/'+fileName;
        }
    }
    else if(folderName == 'js') {
        if(currIsHome(pathname)) {
            genURL= 'assets/js/'+fileName;
        } else {
            genURL= '../assets/js/'+fileName;
        }
    } else if(folderName == 'content') {
        if(currIsHome(pathname)) {
            genURL= 'assets/content/'+fileName;
        } else {
            genURL= '../assets/content/'+fileName;
        }
    } else {
        if(currIsHome(pathname)) {
            genURL= fileName;
        } else {
            genURL= '../'+fileName;
        }
    }
    return genURL;
}

// check if this page is from (pages) or (index >> main)
function currIsHome(pathname) {
    if(pathname.search('pages') != -1) return false;
    return true;
}

// make the theme toggle for (theme button) when click
function themeToggle(themeAttrName= 'data-theme') {
    let theme = document.documentElement.getAttribute(themeAttrName) === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute(themeAttrName, theme);
    localStorage.setItem('theme', theme); // Save the preference in localStorage
}


// fetch 
async function fetchData(url) {
    try {
        // Perform the fetch request
        const response = await fetch(url);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Return the fetched data
        return data;
    } catch (error) {
        // Handle and log the error
        console.error("Error fetching data:", error);
        throw error; // Optionally, rethrow the error for further handling
    }
}