document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('#signup-form');
    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(e) {
    e.preventDefault();
    var emailInput = document.querySelector('#signup-form [type="email"]');
    var email = emailInput.value.trim();
    if (!email.length) return;
    if ((email.indexOf('@') <= 0) ||
        (email.indexOf('.') <= 0) ||
        (email.indexOf('@') > email.lastIndexOf('.'))) return;

    var request = new XMLHttpRequest;
    request.open('post', '/api/signup', true);

    request.onload = formSuccessHandler.bind(this);
    request.onerror = formErrorHandler;

    request.send(new FormData(this));

    function formSuccessHandler() {
        var submitBtn = this.querySelector('[type="submit"]');
        toggleClass(submitBtn, 'btn-success');

        if (request.status >= 200 && request.status < 400) {
            //Success!
            var response = JSON.parse(request.responseText);
            if (response.email) {
                this.querySelector('[type="email"]')
                    .setAttribute('disabled', 'disabled');

                toggleClass(submitBtn, 'btn-primary');
                submitBtn.innerHTML = 'You are in!';
                submitBtn.setAttribute('disabled', 'disabled');

            }
        } else {
            //server responded back with Error
            toggleClass(submitBtn, 'btn-danger');
            submitBtn.innerHTML = 'Sorry! Try again.';
        }
    }

    function formErrorHandler() {
        console.log('connection error');
    }
}

var toggleClass = function (el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
};