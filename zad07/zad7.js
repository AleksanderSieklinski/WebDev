window.addEventListener('load', function(event) {
    fetch('../cgi-bin/zad7_1.py', {
        method: 'POST'
    });
});
function sendRequest() {
    const selected_pora = document.querySelector('input[name="pora_roku"]:checked');
    if (!selected_pora) {
        alert('Please select a button.');
        return;
    }

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    fetch('../cgi-bin/zad7.py', {
        method: 'POST',
        headers: headers,
        body: encodeURI('pora=' + selected_pora.value)
    }).then(response => {
        response.json().then(data => {
            drawHistogram(data);
        });
    });
}

function drawHistogram(data) {
    const canvas = document.getElementById('histogram');
    const canvas_context = canvas.getContext('2d');
    const chart_colors = {
    'Zima': 'rgb(33, 195, 223)',
    'Wiosna': 'rgb(109, 223, 33)',
    'Lato': 'rgb(223, 210, 33)',
    'Jesien': 'rgb(223, 125, 33)'
    };
    const width = canvas.width / data.pora_roku.length;
    var height = 0;
    var next_width_begin = 0;
    canvas_context.clearRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < data.pora_roku.length; i++) {
        height = data.pora_roku[i].count * 20;
        canvas_context.fillStyle = chart_colors[data.pora_roku[i].pora];
        canvas_context.strokeStyle = 'white';
        canvas_context.fillRect(next_width_begin, canvas.height - height-20, width, height);
        canvas_context.strokeRect(next_width_begin, canvas.height - height-20, width, height);
        canvas_context.font = '18px Sans-serif';
        canvas_context.fillText(data.pora_roku[i].pora, next_width_begin + 5, canvas.height - 5);
        next_width_begin += width;
    }
}