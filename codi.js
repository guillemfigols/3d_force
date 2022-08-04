
//  Code for creating a modal 
var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
modalBtn.addEventListener('click', function() {
    modalBg.classList.add('bg-active');
});


modalClose.addEventListener('click', function() {
    modalBg.classList.remove('bg-active');
});


// Code for the load file button
const input = 
document.querySelector('input[type="file"]');
input.addEventListener('change', function (e) {
    const reader = new FileReader()

    reader.onload = function () {
        text = reader.result
        data = JSON.parse(text)
        console.log(data)
    }
    reader.readAsText(input.files[0])
}, false);