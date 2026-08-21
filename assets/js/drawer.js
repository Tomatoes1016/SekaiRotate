const charactList = [
    { value: 'emu', label: 'emu' },
    { value: 'tks', label: 'tks' },
    { value: 'rui', label: 'rui' },
    { value: 'nene', label: 'nene' },
    { value: 'aris', label: 'aris' }
];

const characterImg = document.getElementById('character');
const settingsFab = document.getElementById('settingsFab');
const drawer = document.getElementById('drawer');
const drawerOptions = document.getElementById('drawerOptions');
const drawerBtn = document.getElementById('drawerBtn');

function render() {
    if (!drawerOptions) return;
    const selectedValue = 'emu';
    drawerOptions.innerHTML = charactList
        .map(item => {
            const isChecked = item.value === selectedValue ? 'checked' : '';

            return `
            <label>
                <md-radio
                    class="drawer-item"
                    id="${item.value}"
                    name="character"
                    value="${item.value}" 
                    touch-target="wrapper"
                    ${isChecked}></md-radio>
                <span aria-hidden="true">${item.label}</span>
            </label>
        `;
        })
        .join('');
}

render();

settingsFab?.addEventListener('click', () => {
    drawer.open = true;
});

drawerBtn?.addEventListener('click', () => {
    const Radios = Array.from(drawerOptions.querySelectorAll('md-radio'));
    const checkedRadio = Radios.find(radio => radio.checked);

    if (checkedRadio && characterImg) {
        const selectedCharacter = checkedRadio.id;

        characterImg.src = `./assets/images/${selectedCharacter}.png`;
        characterImg.alt = selectedCharacter;

        console.log('Character switched to:', selectedCharacter)
    }
    drawer.open = false;
});