let files = [];     //array que guardarà els fitxers

const dropArea = document.querySelector('.drop-area');
const dragDropText = document.querySelector('h2');
const button = document.querySelector('button');
const input = document.getElementById('input-file');
const preview = document.getElementById('preview');

['dragover', 'dragleave', 'drop'].forEach((evt) => {
    dropArea.addEventListener(evt, prevDefault);
});

function prevDefault(e) {
    e.preventDefault();
}

//dragOver
dropArea.addEventListener("dragover", function () {
    dropArea.classList.add('active');
    dragDropText.textContent = 'Release to Drop Files';
});
dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove('active');
    dragDropText.textContent = 'Drag & Drop files';
});

//funcionament del DROP
dropArea.addEventListener("drop", function (event) {
    event.preventDefault();

    dropArea.classList.remove('active');
    dragDropText.textContent = 'Drag & Drop files';

    for (const file of event.dataTransfer.files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function () {
                const img = new Image();
                img.src = reader.result;

                const previewDiv = document.createElement('div');
                previewDiv.classList.add('previewImage');
                previewDiv.appendChild(img);
                previewDiv.innerHTML += `<span>${file.name}</span>
                                       <span onclick="removeBtn(${files.length})" class="material-symbols-outlined removeBtn">Esborra</span>`;


                preview.appendChild(previewDiv);
            };
            reader.readAsDataURL(file);
            files.push(file);
        }
    }
    showFiles();
});

//mostra dels arxius
function showFiles() {
    preview.innerHTML = '';
    if (files.length > 0) {
        files.forEach((file, index) => {
            processFile(file, index);
        });
    }
}

//processFile
function processFile(file, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
 
    if (validExtensions.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const fileurL = reader.result;
            let previewDiv = document.createElement('div');
            previewDiv.classList.add('previewImage');
            let img = new Image();
            img.src = fileurL;
            img.alt = file.name;
            let spanFileName = document.createElement('span');
            spanFileName.textContent = file.name;
            let removeBtn = document.createElement('span');
            removeBtn.classList.add('material-symbols-outlined', 'removeBtn');
            removeBtn.textContent = "Esborra";
            removeBtn.onclick = function () {
                removeBtn(index);
            };
 
            previewDiv.appendChild(img);
            previewDiv.appendChild(spanFileName);
            previewDiv.appendChild(removeBtn);
 
            preview.appendChild(previewDiv);
        };
    } else {
        files.splice(index, 1);y
        console.log('Invalid file type. Only images are allowed.');
    }
 }

//funcoiament del botò d'esborrar
function removeBtn(i) {
    files.splice(i, 1);
    showFiles();
}

//botò per afegir arxius
button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});

// 11. Gestiona els arxius seleccionats
input.addEventListener("change", function () {
    files = files.concat(Array.from(input.files));
    showFiles();
});
