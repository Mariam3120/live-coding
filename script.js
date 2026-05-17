const showBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('.clear-btn');

const droppedBox = document.querySelector('.box');

// droppedBox.style.display = "none";

showBtn.addEventListener("click", function() {
   droppedBox.classList.add('is-open')
})

clearBtn.addEventListener('click', () =>{
   droppedBox.classList.remove('is-open');
})
