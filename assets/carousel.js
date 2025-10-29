document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const nextButton = carousel.querySelector('.carousel-next');
    const prevButton = carousel.querySelector('.carousel-prev');
    let currentIndex = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    nextButton.addEventListener('click', nextItem);
    prevButton.addEventListener('click', prevItem);

    showItem(currentIndex);
});