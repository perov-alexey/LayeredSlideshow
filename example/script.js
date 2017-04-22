var animation = new Slideshow(document.getElementById("container"), 300, 400, 2);
window.onload = function() {
    animation.addLayer("https://image.ibb.co/cfmZ6Q/beck1.png", 30);
    animation.addLayer("https://image.ibb.co/b7UeO5/ground2.png", 15);
    animation.addLayer("https://image.ibb.co/m1mti5/character3.png", 5);
    animation.addLayer("https://image.ibb.co/hS6R35/upper.png", 10);
};

function nextSlide() {
    animation.next();
}

function prevSlide() {
    animation.previous();
}