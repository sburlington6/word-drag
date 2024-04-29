document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('word-container');
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            data.words.forEach(word => {
                const draggable = document.createElement('div');
                draggable.className = 'draggable';
                draggable.setAttribute('draggable', 'true');
                draggable.textContent = word;
                container.appendChild(draggable);

                // Random initial placement
                const maxLeft = container.clientWidth - draggable.offsetWidth;
                const maxTop = container.clientHeight - draggable.offsetHeight;
                const randomLeft = Math.floor(Math.random() * maxLeft);
                const randomTop = Math.floor(Math.random() * maxTop);

                draggable.style.left = `${randomLeft}px`;
                draggable.style.top = `${randomTop}px`;
            });

            initDragAndDrop(); // Initialize drag and drop functionality after words are loaded
        });
});

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    let activeDraggable = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', function (e) {
            activeDraggable = draggable;
            e.dataTransfer.setData('text/plain', null);
            draggable.style.opacity = '0.5';
        });

        draggable.addEventListener('dragend', function (e) {
            draggable.style.opacity = '1';
            const x = e.clientX - draggable.offsetWidth / 2;
            const y = e.clientY - draggable.offsetHeight / 2;
            draggable.style.left = `${x}px`;
            draggable.style.top = `${y}px`;
            activeDraggable = null;
        });
    });

    const container = document.getElementById('word-container');
    container.addEventListener('dragover', function (e) {
        e.preventDefault(); // Necessary to allow dropping
    });
}
