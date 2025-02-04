

let currentIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const totalSlides = slides.length;


function updateSlides() {
    // Reset all slides
    slides.forEach(slide => {
        slide.classList.remove("visible-left", "visible-center", "visible-right");
        slide.style.display = "none";
    });


    // Set new visible slides
    const leftIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % totalSlides;


    slides[leftIndex].classList.add("visible-left");
    slides[leftIndex].style.display = "block";
    
    slides[centerIndex].classList.add("visible-center");
    slides[centerIndex].style.display = "block";
    
    slides[rightIndex].classList.add("visible-right");
    slides[rightIndex].style.display = "block";
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
}


function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlides();
}


// Initialize the first three visible slides
updateSlides();


// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
