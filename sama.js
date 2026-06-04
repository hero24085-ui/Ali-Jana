
        document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.querySelector(".envelope-box");
    const audio = document.getElementById("bg-audio");

    if (envelope && audio) {
        envelope.addEventListener("click", () => {
            // Unlocks and plays audio on mobile browsers upon user interaction
            audio.play().catch(error => {
                console.log("Audio playback behavior blocked or handled:", error);
            });
        });
    }
});
        const envelopeBox = document.getElementById('envelopeBox');
        const videoBox = document.getElementById('videoBox');
        const invitationVideo = document.getElementById('invitationVideo');
        const flashOverlay = document.getElementById('flashOverlay');
        const detailsSection = document.getElementById('detailsSection');
        const headElement = document.querySelector('.head');
        const subheadElement = document.querySelector('.subhead');

        envelopeBox.addEventListener('click', function() {
            // 1. Trigger the screen-wide flash transition
            flashOverlay.classList.add('flash-active');

            // 2. Mid-flash swap (250ms) - execute while view is obscured
            setTimeout(() => {
                envelopeBox.style.display = 'none'; // Completely hide static image
                videoBox.style.display = 'block';   // Reveal video structural frame
                
                // Hide the heading and subheading immediately
                if (headElement) headElement.style.display = 'none';
                if (subheadElement) subheadElement.style.display = 'none';
                
                // Play video file seamlessly
                invitationVideo.play().catch(error => {
                    console.log("Video autoplay fluid block intercepted: ", error);
                });

                // Show the rest of your page information below
                detailsSection.classList.add('visible');
                document.body.style.overflowY = 'auto'; // Unlock site scrolling
            }, 250);

            // 3. Dissipate flash screen
            setTimeout(() => {
                flashOverlay.classList.remove('flash-active');
            }, 700);
        });

        // Scroll reveal controller for page elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));

        // --- Countdown Timer Logic ---
        function updateCountdown() {
            // Set targeted Wedding Date (June 8, 2026 at 8:00 PM)
            const weddingDate = new Date('June 8, 2026 20:00:00').getTime();
            const now = new Date().getTime();
            const gap = weddingDate - now;

            if (gap <= 0) {
                document.querySelector('.countdown-container').innerHTML = "<div class='countdown-title'>Today is the Big Day!</div>";
                return;
            }

            // Time math conversions
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);

            // Print numbers with leading zeroes
            document.getElementById('days').innerText = d < 10 ? '0' + d : d;
            document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
            document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
            document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
        }

        // Run counting loop every single second
        setInterval(updateCountdown, 1000);
        updateCountdown();
   
