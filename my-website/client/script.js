document.addEventListener('DOMContentLoaded', function () {
  // Your JavaScript code goes here

  fetch('/api/items')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    const objectTypeDropdown = document.getElementById('objectType');

    document.querySelector('.container').classList.add('fade-in');
  
    objectTypeDropdown.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const currentIndex = this.selectedIndex;
        if (event.key === 'ArrowUp' && currentIndex > 0) {
          this.selectedIndex = currentIndex - 1;
        } else if (event.key === 'ArrowDown' && currentIndex < this.options.length - 1) {
          this.selectedIndex = currentIndex + 1;
        }
      } else if (event.key === 'Enter') {
        this.setAttribute('size', '1');
        this.removeEventListener('blur', blurHandler);
        this.addEventListener('focus', focusHandler);
        document.getElementById('generateButton').focus();
      }
    });
  
    function blurHandler() {
      this.setAttribute('size', '1');
      this.removeEventListener('blur', blurHandler);
      this.addEventListener('focus', focusHandler);
    }
  
    function focusHandler() {
      this.focus();
    }
  
    document.addEventListener('keydown', function (event) {
      const objectTypeDropdown = document.getElementById('objectType');
      if (event.key.toLowerCase() === 'o') {
        objectTypeDropdown.selectedIndex = 0;
        objectTypeDropdown.setAttribute('size', '6');
        objectTypeDropdown.removeEventListener('focus', focusHandler);
        objectTypeDropdown.addEventListener('blur', blurHandler);
        event.preventDefault();
        objectTypeDropdown.focus();
        document.addEventListener('keydown', arrowKeyHandler);
      }
    });
  
    document.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() === 'a') {
        toggleKeybindsDropdown();
      }
    });
  
    function arrowKeyHandler(event) {
      const objectTypeDropdown = document.getElementById('objectType');
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const currentIndex = objectTypeDropdown.selectedIndex;
        if (event.key === 'ArrowUp' && currentIndex > 0) {
          objectTypeDropdown.selectedIndex = currentIndex - 1;
        } else if (event.key === 'ArrowDown' && currentIndex < objectTypeDropdown.options.length - 1) {
          objectTypeDropdown.selectedIndex = currentIndex + 1;
        }
      } else if (event.key === 'Enter') {
        objectTypeDropdown.setAttribute('size', '1');
        objectTypeDropdown.removeEventListener('blur', blurHandler);
        objectTypeDropdown.addEventListener('focus', focusHandler);
        document.getElementById('generateButton').focus();
        document.removeEventListener('keydown', arrowKeyHandler);
      }
    }
  
    function generateSVG() {
      const objectType = document.getElementById('objectType').value;
      const width = 50;
      const height = 50;
      let svgContent = '';
  
      switch (objectType) {
        case 'diagram 1':
          svgContent = `<svg width="${width}" height="${height}"><circle cx="25" cy="25" r="20" fill="blue" /></svg>`;
          break;
        case 'diagram 2':
          svgContent = `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="green" /></svg>`;
          break;
        case 'diagram 3':
          svgContent = `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="red" /></svg>`;
          break;
      }
  
      const svgContainer = document.getElementById('svgContainer');
      svgContainer.innerHTML = svgContent;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    }
  
    function toggleKeybindsDropdown() {
      const keybindsContent = document.getElementById('keybindsContent');
      keybindsContent.style.display = keybindsContent.style.display === 'block' ? 'none' : 'block';
    }
  });