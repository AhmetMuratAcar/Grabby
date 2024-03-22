document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('important-dates-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission to check for editing mode

        const isAnyEditable = Array.from(document.querySelectorAll('.card-title, .card-text'))
                                   .some(element => element.getAttribute('contenteditable') === 'true');
        
        // console.log(isAnyEditable);

        if (isAnyEditable) {
            const userConfirmed = confirm('You are still editing some dates. Are you sure you want to submit?');
            if (userConfirmed) {
                handleSubmit(); // Handle form submission here
            }
        } else {
            handleSubmit();
        }
    });
});

function handleSubmit() {
    const importantDatesContainers = document.querySelectorAll('.important-date-card');
    const importantDates = Array.from(importantDatesContainers).map(container => {
        return {
            title: container.querySelector('.card-title').textContent.trim(),
            date: container.querySelector('.date').textContent.trim(),
            time: container.querySelector('.time') ? container.querySelector('.time').textContent.trim() : undefined
        };
    });

    const data = {
        important_dates: importantDates
    };

    console.log(JSON.stringify(data)); // For debugging

    // Add Google Calendar API logic here
}
