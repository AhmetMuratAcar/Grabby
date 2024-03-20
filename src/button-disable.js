// Small script for disabling/enabling the submit button if file present/not.
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('pdfFile');
    const submitBtn = document.getElementById('submitBtn');

    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            submitBtn.disabled = false; // Enable the submit button
        } else {
            submitBtn.disabled = true; // No file selected, disable the submit button
        }
    });
});
