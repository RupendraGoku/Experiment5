document.querySelectorAll('input').forEach((item) => {
    item.addEventListener("focus", function () {
        item.previousElementSibling.className = 'label-selected';
    })
    item.addEventListener("blur", function () {
        if (item.value === '') {
            item.previousElementSibling.className = '';
        }
    })
})

document.getElementById("registerLink").addEventListener("click", function () {
    if (window.innerWidth < 600) {
        document.getElementById("signUp").style.display = 'block';
        document.getElementById("login").style.display = 'none';
    }
    else {
        document.getElementById("overlay").style.transform = 'translate(550px , -25px)';
    } 
})
document.getElementById("loginLink").addEventListener("click", function () {
    if (window.innerWidth < 600) {
        document.getElementById("login").style.display = 'block';
        document.getElementById("signUp").style.display = 'none';
    }
    else {
        document.getElementById("overlay").style.transform = 'translate(0px , -25px)';
    }
})

document.getElementById("signupForm").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
    }
    if (password === '') {
        alert("Please enter a password.");
        event.preventDefault();
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
    }
    if (password === '') {
        alert("Please enter a password.");
        event.preventDefault();
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}