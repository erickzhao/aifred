//cache selectors

var $paragraphs = $("p");
var $window = $(window);

$window.on('scroll resize', animate);
$window.trigger('scroll');


function animate() {
    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowBottomPosition = windowTopPosition + windowHeight;

    $.each($paragraphs, function() {
        var $element = $(this);
        var elementHeight = $element.height();
        var elementTopPosition = $element.offset().top;
        var elementMiddlePosition = elementTopPosition + (elementHeight/2);

        if (isElementInView(elementMiddlePosition, windowBottomPosition)) {
            $element.addClass('loaded');
        }


    })

}

function isElementInView(elementMiddle, windowBottom) {
    return (elementMiddle <= windowBottom);
}