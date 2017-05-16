'use strict'

let introPage = document.getElementById('intro-page');
let navPage = document.getElementById('nav-page');

introPage.style.visibility = 'visible';
introPage.style.opacity = 100;
navPage.style.visibility = 'hidden';
navPage.style.opacity = 0;


function toggleVisibility() {

    let tmp1 = introPage.style.visibility;
    let tmp2 = introPage.style.opacity;
    introPage.style.visibility = navPage.style.visibility;
    introPage.style.opacity = navPage.style.opacity;
    navPage.style.visibility = tmp1;
    navPage.style.opacity = tmp2;
}