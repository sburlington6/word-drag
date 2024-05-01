document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('word-container');
    const settingsBox = document.getElementById('settings-box');

    // Fetch and process the word groups
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            // Dynamically create checkboxes based on groups
            Object.keys(data).forEach(group => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = true;
                checkbox.className = 'toggle-group';
                checkbox.setAttribute('data-group', group);

                const label = document.createElement('label');
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${group}`));
                settingsBox.appendChild(label);

                // Create draggable elements for words
                data[group].forEach(word => {
                    const draggable = document.createElement('div');
                    draggable.className = `draggable ${group}`;
                    draggable.setAttribute('draggable', 'true');
                    draggable.textContent = word;
                    draggable.style.color = getRandomColor();
                    container.appendChild(draggable);
                });
            });

            // Apply random positioning after all elements are added
            applyRandomPositioning();

            initDragAndDrop();

            // Attach event listener to checkboxes
            document.querySelectorAll('.toggle-group').forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const group = this.getAttribute('data-group');
                    const words = document.querySelectorAll(`.${group}`);
                    words.forEach(word => {
                        word.style.display = this.checked ? '' : 'none';
                    });
                });
            });
        });
});

function applyRandomPositioning() {
    const container = document.getElementById('word-container');
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        const maxLeft = container.clientWidth - draggable.offsetWidth;
        const maxTop = container.clientHeight - draggable.offsetHeight;
        const randomLeft = Math.floor(Math.random() * maxLeft);
        const randomTop = Math.floor(Math.random() * maxTop);

        draggable.style.left = `${randomLeft}px`;
        draggable.style.top = `${randomTop}px`;
    });
}

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
        e.preventDefault();
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
