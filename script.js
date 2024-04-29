document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('word-container');
  const draggables = document.querySelectorAll('.draggable');

  // Randomly position the draggables within the container on page load
  draggables.forEach(draggable => {
      const maxLeft = container.clientWidth - draggable.offsetWidth;
      const maxTop = container.clientHeight - draggable.offsetHeight;
      const randomLeft = Math.floor(Math.random() * maxLeft);
      const randomTop = Math.floor(Math.random() * maxTop);

      draggable.style.left = `${randomLeft}px`;
      draggable.style.top = `${randomTop}px`;
  });

  let activeDraggable = null;

  draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', function (e) {
          activeDraggable = draggable;
          e.dataTransfer.setData('text/plain', null); // Required for Firefox
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

  container.addEventListener('dragover', function (e) {
      e.preventDefault(); // Necessary to allow dropping
  });
});
