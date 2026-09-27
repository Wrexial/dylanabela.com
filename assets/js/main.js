/**
* Template Name: DevFolio - v4.1.0
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Years of experience, calculated from the start year to the current year
     */
    const experienceStartYear = 2014
    const experienceCounter = select('#years-experience')
    if (experienceCounter) {
        experienceCounter.setAttribute('data-purecounter-end', new Date().getFullYear() - experienceStartYear)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav toggle (keyboard support)
     */
    on('keydown', '.mobile-nav-toggle', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Intro type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Project filters (Commercial + Personal sections)
     */
    on('click', '.project-filter', function () {
        const bar = this.closest('.project-filters');
        const gridId = bar ? bar.dataset.target : null;
        if (!gridId) return;
        const filter = this.dataset.filter;
        bar.querySelectorAll('.project-filter').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        select('#' + gridId + ' .filter-item', true).forEach(item => {
            const show = filter === 'all' || item.dataset.filter === filter;
            item.classList.toggle('d-none', !show);
        });
    }, true);

    /**
     * Footer copyright year
     */
    const footerYear = select('#footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /**
     * Embedded game player (Play buttons open a modal instead of a new tab)
     */
    const gameModalEl = select('#gameModal')
    if (gameModalEl && typeof bootstrap !== 'undefined') {
        const gameModal = new bootstrap.Modal(gameModalEl)
        const gameFrame = select('#gameFrame')
        const gameTitle = select('#gameModalTitle')
        const gameOpenTab = select('#gameOpenTab')
        on('click', '.play-embed', function (e) {
            e.preventDefault()
            const name = (this.getAttribute('aria-label') || 'Game').replace(/^Play\s+/, '')
            gameFrame.setAttribute('src', this.getAttribute('href'))
            gameFrame.setAttribute('title', name)
            gameTitle.textContent = name
            gameOpenTab.setAttribute('href', this.getAttribute('href'))
            gameModalEl.classList.toggle('portrait', this.dataset.orient === 'portrait')
            gameModal.show()
        }, true)
        gameModalEl.addEventListener('hidden.bs.modal', () => {
            gameFrame.setAttribute('src', 'about:blank')
        })
    }

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }
})()
