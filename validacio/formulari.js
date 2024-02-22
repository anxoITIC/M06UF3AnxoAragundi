function validateEmpty(element, errorId) {
    let errorElement = document.getElementById(errorId);
    
    if (element.value.trim() === "") {
        element.style.borderColor = "red";
        errorElement.textContent = "Aquest camp és obligatori.";
    } else {
        element.style.borderColor = "green";
        errorElement.textContent = "";
    }
}

function validateEmailField(element) {
    let isValid = validateEmail(element.value);
    let errorElement = document.getElementById("email-error");

    if (isValid) {
        element.style.borderColor = "green";
        errorElement.textContent = "";
    } else {
        element.style.borderColor = "red";
        errorElement.textContent = "Format de correu electrònic incorrecte.";
    }
}

function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

document.getElementById("password").addEventListener("input", function() {
    validatePassword();
});

function validatePassword() {
    let password = document.getElementById("password").value;
    let conditions = [
        /[a-z]/, 
        /[A-Z]/,
        /[0-9]/, 
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ 
    ];

    let isValid = conditions.every(condition => condition.test(password)) && (password.length >= 8 && password.length <= 15);
    let errorElement = document.getElementById("password-error");

    if (isValid) {
        document.getElementById("password").style.borderColor = "green";
        errorElement.textContent = "";
    } else {
        document.getElementById("password").style.borderColor = "red";
        errorElement.textContent = "La contrasenya no compleix els requisits.";
    }
}

function validateConfirmPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password");
    let errorElement = document.getElementById("confirm-password-error");

    if (confirmPassword.value === password) {
        confirmPassword.style.borderColor = "green";
        errorElement.textContent = "";
    } else {
        confirmPassword.style.borderColor = "red";
        errorElement.textContent = "Les contrasenyes no coincideixen.";
    }
}

function validateForm() {
    let form = document.forms["myForm"];
    let isFormValid = true;

    if (!validateNotEmpty("nombre", "nombre-error")) {
        isFormValid = false;
    }

    if (!validateNotEmpty("direccion", "direccion-error")) {
        isFormValid = false;
    }
    return isFormValid;
}

function validateNotEmpty(elementId, errorId) {
    let element = document.getElementById(elementId);
    let errorElement = document.getElementById(errorId);
    
    if (element.value.trim() === "") {
        element.style.borderColor = "red";
        errorElement.textContent = "Aquest camp és obligatori.";
        return false;
    } else {
        element.style.borderColor = "green";
        errorElement.textContent = "";
        return true;
    }
}