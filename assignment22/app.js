 const box = document.getElementById('box');
    const horizontal = document.getElementById('horizontal');
    const vertical = document.getElementById('vertical');
    const blur = document.getElementById('blur');
    const hValue = document.getElementById('h-value');
    const vValue = document.getElementById('v-value');
    const bValue = document.getElementById('b-value');

    function updateBoxShadow() {
        const h = horizontal.value;
        const v = vertical.value;
        const b = blur.value;
        box.style.boxShadow = `${h}px ${v}px ${b}px rgba(255, 255, 255, 0.3)`;
        hValue.textContent = h + 'px';
        vValue.textContent = v + 'px';
        bValue.textContent = b + 'px';
    }

    horizontal.addEventListener('input', updateBoxShadow);
    vertical.addEventListener('input', updateBoxShadow);
    blur.addEventListener('input', updateBoxShadow);