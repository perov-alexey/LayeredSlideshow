/**
 * Create layered animated slideshow based on canvas.
 * @param container Container for canvases.
 * @param canvasWidth Width of the created canvases.
 * @param canvasHeight Height of the created canvases.
 * @param amountOfSlides Amount of slides.
 * @constructor
 */
function Slideshow(container, canvasWidth, canvasHeight, amountOfSlides) {

    var slideNumber = 0;
    var layers = [];

    /**
     * Add new layer to the slideshow.
     * @param imageUrl Url to image to be add it to canvas.
     * @param speedMultiplier Multiplier for the speed of layer showing.
     */
    this.addLayer = function(imageUrl, speedMultiplier) {
        var canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.position = "absolute";
        container.appendChild(canvas);

        var image = new Image();
        var self = this;

        image.onload = function () {
            requestAnimationFrame(_moveLeft(canvas, speedMultiplier, image, slideNumber, amountOfSlides,
                canvasWidth / speedMultiplier));
        };

        image.src = imageUrl;

        layers.push({
            canvas: canvas,
            image: image,
            speedMultiplier: speedMultiplier
        });
    };

    /**
     * Show next slide
     */
    Slideshow.prototype.next = function() {
        slideNumber++;
        for (var i = 0; i < layers.length; i++) {
            requestAnimationFrame(_moveLeft(layers[i].canvas, layers[i].speedMultiplier, layers[i].image,
                slideNumber, amountOfSlides, canvasWidth / layers[i].speedMultiplier));
        }
    };

    /**
     * Show previous slide
     */
    Slideshow.prototype.previous = function() {
        slideNumber--;
        for (var i = 0; i < layers.length; i++) {
            requestAnimationFrame(_moveRight(layers[i].canvas, layers[i].speedMultiplier, layers[i].image,
                slideNumber, amountOfSlides, canvasWidth / layers[i].speedMultiplier));
        }
    };

    //TODO Refact it!
    var _moveLeft = function(canvas, speedMultiplier, image, slideNumber, amountOfSlides, x) {
        return function() {
            if (x-- == 0) return;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(image, (image.width * slideNumber/ amountOfSlides) - x * speedMultiplier, 0, canvasWidth,
                canvasHeight, 0, 0, canvasWidth, canvasHeight);
            requestAnimationFrame(_moveLeft(canvas, speedMultiplier, image, slideNumber, amountOfSlides, x));
        };
    };

    //TODO Refact it!
    var _moveRight = function(canvas, speedMultiplier, image, slideNumber, amountOfSlides, x) {
        return function() {
            if (x-- == 0) return;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(image, x * speedMultiplier - (image.width * slideNumber/ amountOfSlides), 0, canvasWidth,
                canvasHeight, 0, 0, canvasWidth, canvasHeight);
            requestAnimationFrame(_moveRight(canvas, speedMultiplier, image, slideNumber, amountOfSlides, x));
        };
    };

}