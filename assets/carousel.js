document.addEventListener('DOMContentLoaded', function () {
    /** @type {HTMLElement|null} */
    const carouselEl = /** @type {HTMLElement|null} */ (document.querySelector('.carousel'));
    if (!carouselEl) return;

    /** @type {HTMLElement|null} */
    const innerEl = /** @type {HTMLElement|null} */ (carouselEl.querySelector('.carousel-inner'));
    if (!innerEl) return;

    /** @type {HTMLElement[]} */
    const items = Array.from(innerEl.querySelectorAll('.carousel-item')).map(i => /** @type {HTMLElement} */ (i));
    if (items.length === 0) return;

    const nextButton = /** @type {HTMLElement|null} */ (carouselEl.querySelector('.carousel-control-next'));
    const prevButton = /** @type {HTMLElement|null} */ (carouselEl.querySelector('.carousel-control-prev'));

    // Read settings from data-attributes (set by the section)
        const slidesToShow = parseInt((carouselEl.dataset && carouselEl.dataset.slidesToShow) || '1', 10) || 1;
        const autoplay = (carouselEl.dataset && carouselEl.dataset.autoplay) === 'true';
        const autoplaySpeed = parseInt((carouselEl.dataset && carouselEl.dataset.autoplaySpeed) || '3000', 10) || 3000;

    // Set item widths so that multiple slides can be shown
    const itemWidthPercent = 100 / slidesToShow;
        items.forEach((item) => {
            item.style.minWidth = itemWidthPercent + '%';
        });

        let currentIndex = 0;
    const total = items.length;
    const maxIndex = Math.max(0, total - slidesToShow);

    function update() {
                const offset = (currentIndex * itemWidthPercent);
                if (innerEl) innerEl.style.transform = `translateX(-${offset}%)`;
    }

    function nextItem() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        update();
    }

    function prevItem() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        update();
    }

        if (nextButton) {
            nextButton.addEventListener('click', function (e) {
                e.preventDefault();
                nextItem();
                resetAutoplay();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', function (e) {
                e.preventDefault();
                prevItem();
                resetAutoplay();
            });
        }

    // Autoplay
        /** @type {number|null} */
        let autoplayTimer = null;
    function startAutoplay() {
        if (autoplay && !autoplayTimer) {
            autoplayTimer = setInterval(nextItem, autoplaySpeed);
        }
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause on hover/focus to improve accessibility
        carouselEl.addEventListener('mouseenter', stopAutoplay);
        carouselEl.addEventListener('mouseleave', startAutoplay);
        carouselEl.addEventListener('focusin', stopAutoplay);
        carouselEl.addEventListener('focusout', startAutoplay);

    // Initialize
    update();
    startAutoplay();
});