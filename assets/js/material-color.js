import { argbFromHex, themeFromSourceColor, applyTheme, sourceColorFromImage } from "./material-color-utilities.js";

const character = document.getElementById('character');

async function updateTheme() {
    if (!character) return;
    try {
        const sourceColor = await sourceColorFromImage(character);
        const theme = themeFromSourceColor(sourceColor);

        console.log(JSON.stringify(theme, null, 2));

        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(theme, { target: document.body, dark: systemDark });
    } catch (error) {
        console.error('Failed to update theme', error);

    }
}

if (character) {
    character.addEventListener('load', updateTheme);
    if (character.complete) {
        updateTheme();
    }
}