function loadMessages() {
    event.preventDefault();
    var temat = document.getElementById('temat').value;
    var tresc = document.getElementById('tresc').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'zad8.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('temat=' + encodeURIComponent(temat) + '&tresc=' + encodeURIComponent(tresc));
    xhr.onload = function() {
        if (xhr.status == 200) {
            var messages = JSON.parse(xhr.responseText);
            var table = '<table>';
            for (var key in messages) {
                var record = messages[key];
                table += '<tr><td>' + key + '</td><td>' + record.temat + '</td><td>' + record.tresc + '</td></tr>';
            }
            table += '</table>';
            document.getElementById('messages').innerHTML = table;
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    document.getElementById('temat').value = '';
    document.getElementById('tresc').value = '';
};
window.onload = function() {
    loadMessages();
};
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};