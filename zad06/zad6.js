 document.getElementById('triangleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    var x3 = document.getElementById('x3').value;
    var y3 = document.getElementById('y3').value;
    var a = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    var b = Math.sqrt(Math.pow(x3-x2, 2) + Math.pow(y3-y2, 2));
    var c = Math.sqrt(Math.pow(x1-x3, 2) + Math.pow(y1-y3, 2));
    if (a + b <= c || a + c <= b || b + c <= a) {
        alert('The points do not form a triangle.');
        return;
    }
    var canvas_ele = document.getElementById("canvas");
    if (canvas_ele) {
        var context = canvas_ele.getContext("2d");
        if (context) {
            context.clearRect(0, 0, canvas_ele.width, canvas_ele.height);
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineTo(x3, y3);
            context.closePath();
            context.lineWidth = 10;
            context.strokeStyle = '#666666';
            context.stroke();
            context.fillStyle = "#FFCC00";
            context.fill();
        } else {
            alert('Your browser does not support canvas.');
        }
    }
    var pathElement = document.querySelector('svg path');
    if (pathElement) {
        var path = 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' L' + x3 + ' ' + y3 + ' Z';
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', "#008000");
        pathElement.setAttribute('stroke', "#666666");
        pathElement.setAttribute('stroke-width', 5);
    }
});