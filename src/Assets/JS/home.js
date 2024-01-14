function launch() {
    const dropdown = document.getElementById("mc-versions");
    const selectedValue = String(dropdown.options[dropdown.selectedIndex].value);
    window.api.launch(selectedValue);
}

function updateButton() {
    const dropdown = document.getElementById("mc-versions");
    const selectedValue = String(dropdown.options[dropdown.selectedIndex].value);

    const button = document.getElementById("launch-btn");

    button.innerHTML = `Launch Minecraft ${selectedValue}`
}

function logIn() {
    window.api.login()
}

setInterval(updateButton, 1);