$(document).ready(function(){

    //if screen is narrow on document load, load dark navbar
    if ($(window).width() < 768) {
        addDark();
    }

    //toggle between clear and dark navbars depending on screen width and position
    $(window).resize(function() {
        if ($(window).width() < 768 || $(window).scrollTop() >= 100) { //if scrolled down or narrow screen, add dark navbar
            addDark();
        } else {
            removeDark();
        }
    });

    //toggle between clear and dark navbars depending on how much you scroll (only for wider screens)
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 100 || $(window).width() < 768) {
            addDark();
        } else {
            removeDark();
        }
    });
});

function addDark() {
    $(".navbar-fixed-top").removeClass('clear-nav').addClass('dark-nav');
}

function removeDark() {
    $(".navbar-fixed-top").addClass('clear-nav').removeClass('dark-nav');   
}