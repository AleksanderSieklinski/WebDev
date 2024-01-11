document.getElementById('parameters').addEventListener('submit', function(event) {
    event.preventDefault();
    let initialVelocity = document.getElementById('velocity').value;
    let angle = document.getElementById('angle').value;
    let gravity = document.getElementById('gravity').value;
    let initheight = parseFloat(document.getElementById('height').value);
    let airResistanceCoefficient = document.getElementById('airResistanceCoefficient').value;
    drawProjectileMotion(initialVelocity, angle, gravity, initheight, airResistanceCoefficient/1000);
});
document.getElementById('saveParameters').addEventListener('click', function() {
    if (isLoggedIn) {
        var velocity = document.getElementById('velocity').value;
        var angle = document.getElementById('angle').value;
        var height = document.getElementById('height').value;
        var gravity = document.getElementById('gravity').value;
        var airResistanceCoefficient = document.getElementById('airResistanceCoefficient').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_parameters.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('velocity=' + encodeURIComponent(velocity) + '&angle=' + encodeURIComponent(angle)
         + '&height=' + encodeURIComponent(height) + '&gravity=' + encodeURIComponent(gravity)
          + '&airResistanceCoefficient=' + encodeURIComponent(airResistanceCoefficient));
        xhr.addEventListener('load', function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText);
            } else {
                console.log('The request failed!');
            }
        });
    } else {
        alert('You must be logged in to save parameters.');
    }
});
document.getElementById('goToPage').addEventListener('click', function() {
    window.location.href = 'tech.html';
});
window.addEventListener('load', function() {
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
});
window.addEventListener('resize', function() {
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
});
function setGravity(value) {
    document.getElementById('gravity').value = value;
}
function updateAirResistanceCoefficient(isChecked) {
    var airResistanceCoefficientInput = document.getElementById('airResistanceCoefficient');
    if (isChecked) {
        airResistanceCoefficientInput.value = airResistanceCoefficient;
        airResistanceCoefficientInput.disabled = false;
    } else {
        airResistanceCoefficientInput.value = 0;
        airResistanceCoefficientInput.disabled = true;
    }
}
function drawProjectileMotion(initialVelocity, angle, gravity, initheight, airResistanceCoefficient) {
    angle = angle * Math.PI / 180;
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    let time = 0;
    let x = 0;
    let y = initheight;
    let vx = initialVelocity * Math.cos(angle);
    let vy = initialVelocity * Math.sin(angle);
    let maxHeight = initheight;
    function animate() {
        if (y>=0) {
            let speed = Math.sqrt(vx * vx + vy * vy);
            let resist = airResistanceCoefficient * speed * speed;
            vx -= vx / speed * resist * 0.01;
            vy -= gravity * 0.01;
            if (speed != 0) {
                vy -= (vy / speed * resist) * 0.01;
            }
            if (y > maxHeight) {
                maxHeight = y;
            }
            x += vx * 0.01;
            y += vy * 0.01;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.lineWidth = 3;
            context.lineTo(x, canvas.height - y);
            context.stroke();
            context.font = '10px Arial';
            context.fillText(`x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, prędkość: ${speed.toFixed(2)}`, x + 10, canvas.height - y);
            time += 0.01;
            window.requestAnimationFrame(animate);
        } else {
            context.font = '20px Arial';
            context.fillText(`Maksymalna wysokość podczas lotu: ${maxHeight.toFixed(2)} m`, 10, 30);
            context.fillText(`Zasięg: ${x.toFixed(2)} m`, 10, 60);
            context.fillText(`Czas lotu: ${time.toFixed(2)} s`, 10, 90);
        }
    }
    animate();
}