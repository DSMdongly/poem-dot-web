let writeForm = document.getElementById('writeForm');

function addPoem(title, content, alignment, callback) {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(true);
            } else {
                callback(false);
            }
        }
    };

    xhr.open('POST', 'http://52.43.254.152/poem', true);
    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Poem-Session-Key', localStorage.getItem('Poem-Session-Key'))

    xhr.send(`title=${title}&content=${content}&alignment${alignment}`);
}


let titleForm = writeForm.querySelector('#poemTitle');
let contentForm = writeForm.querySelector('#poemContent');

let poemAligns = writeForm.querySelectorAll('.setAligns');
            
Array.from(poemAligns).forEach((elem, index) => {
    elem.addEventListener('click', () => {
        /* 각각 text-align들 */
        if (index === 0) {
            contentForm.style.textAlign = "left";
        } else if (index === 1) {
            contentForm.style.textAlign = "center";
        } else if (index === 2) {
            contentForm.style.textAlign = "right";
        }
    });
});

let writeBtn = writeForm.querySelector('#writeBtn');

function writePoem(title, content, alignment) {
    addPoem(title, content, alignment, (result) => {
        if (result) {
            alert('시 작성 성공');
            location.href = './MainPage.html';
        } else {
            alert('시 작성 실패');
        }
    });
}

writeBtn.onclick = (e) => {
    let title = titleForm.value;
    let content = contentForm.value;
    
    let alignment = contentForm.style.textAlign;

    if (alignment === 'left') {
        alignment = 1;
    } else if (alignment === 'center') {
        alignment = 2;
    } else if (alignment === 'right') {
        alignment = 3;
    } else {
        alignment = 1;
    }

    writePoem(title, content, alignment);
};