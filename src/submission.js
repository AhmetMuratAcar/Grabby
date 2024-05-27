import { googleAuth } from './src/google-auth.js';
import dateFinder from './src/GPT.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('important-dates-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission to check for editing mode

        const isAnyEditable = Array.from(document.querySelectorAll('.card-title, .card-text'))
                                   .some(element => element.getAttribute('contenteditable') === 'true');
        
        if (isAnyEditable) {
            const userConfirmed = confirm('You are still editing some dates. Are you sure you want to submit?');
            if (userConfirmed) {
                handleSubmit();
            }
        } else {
            handleSubmit();
        }
    });
});

async function handleSubmit() {
    const importantDatesContainers = document.querySelectorAll('.important-date-card');
    const importantDates = Array.from(importantDatesContainers).map(container => {
        const eventObject = {
            title: container.querySelector('.card-title').textContent.trim(),
            date: container.querySelector('.date').textContent.trim(),
        };

        const timeElement = container.querySelector('.time');
        if (timeElement) {
            eventObject.time = timeElement.textContent.trim();
        }

        return eventObject;
    });

    const data = {
        important_dates: importantDates
    };

    console.log(JSON.stringify(data)); // For debugging

    // Redirect to /google-auth to start OAuth flow
    window.location.href = '/google-auth';
}

export async function finalizeSubmission() {
    const importantDatesContainers = document.querySelectorAll('.important-date-card');
    const importantDates = Array.from(importantDatesContainers).map(container => {
        const eventObject = {
            title: container.querySelector('.card-title').textContent.trim(),
            date: container.querySelector('.date').textContent.trim(),
        };

        const timeElement = container.querySelector('.time');
        if (timeElement) {
            eventObject.time = timeElement.textContent.trim();
        }

        return eventObject;
    });

    const data = {
        important_dates: importantDates
    };

    console.log(JSON.stringify(data)); // For debugging

    // Extract dates using dateFinder
    const extractedDates = await dateFinder(JSON.stringify(data));

    // Further processing with extractedDates (e.g., sending to server to update Google Calendar)
    console.log('Extracted Dates:', extractedDates);
}
