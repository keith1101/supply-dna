document.addEventListener('DOMContentLoaded', () => {

    /* --------------------- */
    /* Animated Hero Headline*/
    /* --------------------- */
    const animatedHeadline = document.getElementById('animated-headline');
    if (animatedHeadline){
        const words = ['Transparency','Security','Efficiency','Authenticity'];
        let index = 0;
        setInterval(() => {
            animatedHeadline.style.opacity = '0';
            index = (index + 1) % words.length;
            setTimeout(() => {
                animatedHeadline.textContent = words[index];
                animatedHeadline.style.opacity = '1';
            }, 300);
        }, 3000);
    }

    /* --------------------- */
    /* GSAP & ScrollTrigger  */
    /* --------------------- */
    gsap.registerPlugin(ScrollTrigger);

    /* Hero entrance */
    gsap.from('.hero-content > *', {
        opacity:0,
        y:30,
        duration:1,
        stagger:.2,
        ease:'power3.out',
        delay:.5
    });

    /* Workflow steps */
    const workflowTl = gsap.timeline({
        scrollTrigger:{
            trigger:'.workflow-diagram',
            start:'top 85%',
            toggleActions:'play none none none'
        }
    });
    workflowTl
        .from('.workflow-step', {
            opacity:0,
            scale:.8,
            y:30,
            duration:.6,
            stagger:.4,
            ease:'back.out(1.7)'
        })
        .from('.workflow-connector', {
            scaleX:0,
            duration:.5,
            stagger:.4,
            ease:'power2.inOut'
        }, '-=1.5');

    /* Tech cards: show when in view, hide when out */
    gsap.utils.toArray('.tech-card').forEach((card, i) => {
        gsap.fromTo(card,
            {opacity:0, y:50},
            {
                opacity:1,
                y:0,
                duration:.5,
                ease:'power2.out',
                scrollTrigger:{
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play reverse play reverse',
                    // markers:true
                }
            });
    });

    /* Active nav link on scroll */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    function activateNavLink(){
        let index = sections.length;
        while(--index && window.scrollY + 90 < sections[index].offsetTop){}
        navLinks.forEach(link => link.classList.remove('active'));
        if(navLinks[index]) navLinks[index].classList.add('active');
    }
    activateNavLink();
    window.addEventListener('scroll', activateNavLink);

    /* Refresh triggers on full load (fonts/icons) */
    window.addEventListener('load', () => ScrollTrigger.refresh());
});
