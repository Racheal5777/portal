const form = document.getElementById('userForm');
const submitBtn = document.getElementById('submit-btn');

function getCsrfTokenFromForm() {
    const input = form.querySelector('input[name="csrfmiddlewaretoken"]');
    return input ? input.value : null;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // Try to get CSRF token from the form first (hidden input Django adds)
    let csrfToken = '';
    const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
    if (csrfInput) csrfToken = csrfInput.value;

    // Fallback: get CSRF token from cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    if (!csrfToken) csrfToken = getCookie('csrftoken');

    fetch('', {
        method: 'POST',
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {},
        body: formData,
        credentials: 'same-origin'
    })
        .then(response => {
            const notice = document.getElementById('notice');
            if (!response.ok) {
                return response.text().then(text => {
                    const msg = text || `Request failed: ${response.status}`;
                    if (notice) {
                        notice.textContent = msg;
                        notice.style.color = '#e17055';
                    }
                    throw new Error(msg);
                });
            }
            return response.json();
        })
        .then(data => {
            const notice = document.getElementById('notice');
            if (notice) {
                notice.textContent = data.message || 'Submission successful';
                notice.style.color = '#1e7e34';
            }
            // Optionally reset the form after a short delay
            form.reset();
        })
        .catch(error => {
            console.error(error);
            const notice = document.getElementById('notice');
            if (notice && !notice.textContent) {
                notice.textContent = 'Error submitting form';
                notice.style.color = '#e17055';
            }
        });
});
