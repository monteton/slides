document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Generalized Carousel functionality
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = inner.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        let index = 0;
        const isVideoCarousel = carousel.classList.contains('video-carousel');

        const showItem = (i) => {
            if (i >= items.length) {
                i = 0;
            } else if (i < 0) {
                i = items.length - 1;
            }
            
            let offset = i * 100;
            if (isVideoCarousel) {
                const itemWidth = items[0].offsetWidth;
                const gap = 20; // As defined in CSS
                offset = i * (itemWidth + gap);
                inner.style.transform = `translateX(-${offset}px)`;
            } else {
                 inner.style.transform = `translateX(-${offset}%)`;
            }

            index = i;
        };

        prevButton.addEventListener('click', () => {
            showItem(index - 1);
        });

        nextButton.addEventListener('click', () => {
            showItem(index + 1);
        });

        if (!isVideoCarousel) {
             setInterval(() => {
                showItem(index + 1);
            }, 5000);
        }
    });
});
