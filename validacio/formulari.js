let form = document.querySelector('#form');

//inputs html
let inputs = {nom: document.querySelector('#nom'), 
            email: document.querySelector('#email'), 
            password: document.querySelector('#password'), 
            repeat: document.querySelector('#repeat'), 
            postal: document.querySelector('#postal')};

let spans = {nom: document.querySelector('#nomMsg'), 
            email: document.querySelector('#emailMsg'), 
            password: document.querySelector('#passwordMsg'), 
            repeat: document.querySelector('#repeatMsg'), 
            postal: document.querySelector('#postalMsg')};



//event listener de la contrasenya
inputs.password.addEventListener("input", function() {
    regExps.forEach((regExp, index) => { showPasswordMessage(regExp.test(inputs.password.value), index); });
});

//regular la contrasenya
let regExps = [/^.{8,}$/, /[A-Z]/, /[a-z]/, /[0-9]/, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/];

//event listener del nom
inputs.nom.addEventListener("focusout", function() {
    if (inputs.nom.value == '') stylesInputSpan(inputs.nom, spans.nom, 'red', false); 
    else stylesInputSpan(inputs.nom, spans.nom, 'green', true);
});

//event listener del correu
inputs.email.addEventListener("focusout", function() {
    if (!validateEmail(inputs.email.value)) stylesInputSpan(inputs.email, spans.email, 'red', false);
    else stylesInputSpan(inputs.email, spans.email, 'green', true);
});


inputs.password.addEventListener("focusout", function() {
    let valid = 0;
    let lis = document.querySelectorAll('li');
    lis.forEach(li => { if (li.style.color == 'green') valid++; });    
    if (valid == 5) stylesInputSpan(inputs.password, spans.password, 'green', true);
    else stylesInputSpan(inputs.password, spans.password, 'red', false);
});

inputs.repeat.addEventListener("focusout", function() {
    if (inputs.repeat.value != inputs.password.value) stylesInputSpan(inputs.repeat, spans.repeat, 'red', false);
    else stylesInputSpan(inputs.repeat, spans.repeat, 'green', true);
});

function stylesInputSpan(input, span, color, hidden) {
    input.style.border = `1px solid ${color}`;
    span.hidden = hidden; 
}

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
       return true;
    } else {
       return false;
    }
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    let valid = 0;

    Object.values(inputs).forEach((camp, index) => { if (camp.style.border == '1px solid green') valid++; });
    if (valid == 5) form.submit();
});


//codi postal
inputs.postal.addEventListener("focusout", function() {
    if (inputs.postal.value == '') stylesInputSpan(inputs.postal, spans.postal, 'red', false); 
    else stylesInputSpan(inputs.postal, spans.postal, 'green', true);
});
//mostrar les condicions per fer la contrasenya
function showPasswordMessage(pwdTest, index) {
    spans.password.hidden = false;
    let li = document.getElementById(`li_${index}`);
    if (pwdTest) li.style.color = "green";
    else li.style.color = "red";

    return pwdTest;
}