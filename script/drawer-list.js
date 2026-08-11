import {
    sourceColorFromImage,
    themeFromSourceColor,
    hexFromArgb
} from './material-color-utilities.js';

const settingsBtnOpen = document.getElementById('settingsBtnOpen');
const settingsBtnClose = document.getElementById('settingsBtnClose');
const settingsDrawer = document.getElementById('settingsDrawer');
const drawerList = document.getElementById('drawerList');
const mainCharacter = document.getElementById('mainCharacter');

const drawerOptions = [
    {
        id: '1',
        label: 'emu',
        selected: true
    },
    {
        id: '2',
        label: 'tks',
        selected: false
    },
    {
        id: '3',
        label: 'rui',
        selected: false
    },
    {
        id: '4',
        label: 'nene',
        selected: false
    }
];

function refresh() {
    drawerList.innerHTML = drawerOptions.map(item => `
        <div class="drawer-item ${item.selected ? 'selected' : ''}" data-id="${item.id}">
            <span>${item.label}</span>
        </div>
    `).join('');
}

settingsBtnOpen.addEventListener('click', () => {
    settingsDrawer.classList.add('active');
    mainCharacter.classList.add('blurred');
});
settingsBtnClose.addEventListener('click', () => {
    settingsDrawer.classList.remove('active');
    mainCharacter.classList.remove('blurred');
});

drawerList.addEventListener('click', (e) => {
    const item = e.target.closest('.drawer-item');
    if (!item) return;
    const selectedId = item.dataset.id;
    drawerOptions.forEach(opt => {
        opt.selected = (opt.id === selectedId);
    });
    refresh();
});

refresh();

async function applyMonetTheme() {
    const character = document.getElementById('character');
    if (!character) return;

    const updateColor = async () => {
        try {
            const seedColor = await sourceColorFromImage(character);

            const theme = themeFromSourceColor(seedColor);
            const scheme = theme.schemes.dark;
            const root = document.documentElement.style;

            root.setProperty('--md-sys-color-primary-container', hexFromArgb(scheme.primaryContainer))
            root.setProperty('--md-sys-color-on-primary-container', hexFromArgb(scheme.onPrimaryContainer));
            root.setProperty('--md-sys-color-background', hexFromArgb(scheme.background));

            root.setProperty('--md-sys-color-secondary-container', hexFromArgb(scheme.secondaryContainer));
            root.setProperty('--md-sys-color-on-secondary-container', hexFromArgb(scheme.onSecondaryContainer));

            root.setProperty('--md-sys-color-surface', hexFromArgb(scheme.surface));
            root.setProperty('--md-sys-color-on-surface', hexFromArgb(scheme.onSurface));

            root.setProperty('--md-sys-color-surface-variant', hexFromArgb(scheme.surfaceVariant));
            root.setProperty('--md-sys-color-on-surface-variant', hexFromArgb(scheme.onSurfaceVariant));
        } catch (error) {
            console.error('Error applying Monet theme:', error);
        }
    };

    if (character.complete) {
        await updateColor();
    } else {
        character.addEventListener('load', updateColor);
    }
}

document.addEventListener('DOMContentLoaded', applyMonetTheme);