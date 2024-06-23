

/* Generate JS file
    This file for semi dynamic page to generate the main contents
    in the pages at: home, ..pages, etc...
*/

document.addEventListener('DOMContentLoaded', () => { 

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


    // navbar element ============================================
    
    // theme toggle ------
    const themeToggleButton = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    // Toggle theme when button is clicked
    themeToggleButton.addEventListener('click', () => themeToggle('data-theme'));


    // navbar build ------
    const nav = `    <nav class="navbar">
                        <div class="container">
                            <h1 class="nav-title">Algorithm Visualizer</h1>
                            <ul class="nav-links">
                                <li><a href="${changeNavURL('home')}">Home</a></li>
                                <li><a href="#algorithms">Algorithms</a></li>
                                <li><a href="${changeNavURL('about')}">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                    </nav>`;
    const navEl = document.querySelector('.navEl');
    navEl.innerHTML = nav;




    // footer element ============================================
    const footer = `<footer class="footer">
                        <div class="container">
                            <p>&copy; 2024 Algorithm Visualizer. All Rights Reserved.</p>
                        </div>
                    </footer>`;
    const footerEl = document.querySelector('.footerEl');
    footerEl.innerHTML = footer;


});



// console.log(currIsHome(window.location.pathname));

// functions used ============================================
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

function currIsHome(pathname) {
    if(pathname.search('pages') != -1) return false;
    return true;
}

function themeToggle(themeAttrName= 'data-theme') {
    let theme = document.documentElement.getAttribute(themeAttrName) === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute(themeAttrName, theme);
    localStorage.setItem('theme', theme); // Save the preference in localStorage
}