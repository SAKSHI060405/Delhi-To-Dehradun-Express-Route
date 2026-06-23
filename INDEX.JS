document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjusting for the sticky navbar height
                behavior: 'smooth'
            });
        });
    });

    // 2. Accordion Logic for Project Phases
    const accordions = document.querySelectorAll('.accordion-btn');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle active styling
            this.classList.toggle('active');
            
            // Toggle panel slide animation
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null; // Close it
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"; // Open it
            }
        });
    });

    // 3. Trip Planner (Time Calculator)
    const calcBtn = document.getElementById('calc-btn');
    const departureInput = document.getElementById('departure-time');
    const resultText = document.getElementById('result-text');

    calcBtn.addEventListener('click', () => {
        const depTime = departureInput.value;
        
        // Input validation
        if (!depTime) {
            resultText.style.color = '#e74c3c'; // Red for error
            resultText.innerText = '⚠️ Please enter a valid departure time.';
            return;
        }

        // Split user input into hours and minutes
        let [hours, minutes] = depTime.split(':').map(Number);
        
        // The expressway cuts travel time to exactly 2.5 hours (2 hrs 30 mins)
        hours += 2;
        minutes += 30;

        // Roll over minutes to hours if it exceeds 59
        if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
        }

        // Keep hours strictly within a 24-hour cycle
        hours = hours % 24;

        // Format for AM/PM display
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12; // 0 becomes 12 for midnight
        const displayMinutes = minutes.toString().padStart(2, '0');

        // Output final result
        resultText.style.color = '#2e8b57'; // Back to green
        resultText.innerText = `🚗 You will arrive in Dehradun around ${displayHours}:${displayMinutes} ${ampm}.`;
    });
});