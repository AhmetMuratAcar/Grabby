document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            let cardBody = this.closest('.card-body');
            let isEditable = cardBody.querySelector('.card-title').getAttribute('contenteditable') === 'true';

            // Toggle contenteditable state and editable-border class for .card-title and .card-text elements
            cardBody.querySelectorAll('.card-title, .card-text').forEach(element => {
                // Toggle contenteditable state
                element.setAttribute('contenteditable', !isEditable);
                
                // Toggle the editable-border class to indicate edit mode visually
                element.classList.toggle('editable-border');
            });

            // Toggle button classes based on whether we're currently editing or not
            if (isEditable) {
                // Switch from "editing" mode to "normal" mode
                this.classList.remove('btn-danger');
                this.classList.add('btn-primary');

                console.log('Saving:', cardBody.querySelector('.card-title').textContent, cardBody.querySelector('.date').textContent, cardBody.querySelector('.time') ? cardBody.querySelector('.time').textContent : '');
            } else {
                // Switch from "normal" mode to "editing" mode
                this.classList.remove('btn-primary');
                this.classList.add('btn-danger');
            }
        });
    });
});
