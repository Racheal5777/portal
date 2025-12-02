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
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});

