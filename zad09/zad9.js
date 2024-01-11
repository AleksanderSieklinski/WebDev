function changeBgColor() {
    var color = prompt("Enter a color:");
    document.body.style.backgroundColor = color;
    document.cookie = "bg_color=" + color + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}
function goBack() {
    window.history.back();
}