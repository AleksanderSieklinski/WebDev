// http://149.156.109.180:7007/stud
// http://localhost:7007/stud
var responsesDiv = document.getElementById('responses');
function createStudent(fname, lname, email) {
    console.log(fname, lname, email);
    fetch('http://localhost:7007/stud', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fname, lname, email }),
    })
    .then(response => response.json())
    .then(data => responsesDiv.innerText += JSON.stringify(data) + '\n')
    .catch((error) => console.error('Error:', error));
}
function getStudents() {
    fetch('http://localhost:7007/stud')
    .then(response => response.json())
    .then(data => responsesDiv.innerText += JSON.stringify(data) + '\n')
    .catch((error) => console.error('Error:', error));
}
function getStudentById(id) {
    fetch(`http://localhost:7007/stud/${id}`)
    .then(response => response.json())
    .then(data => responsesDiv.innerText += JSON.stringify(data) + '\n')
    .catch((error) => console.error('Error:', error));
}
function deleteStudentById(id) {
    fetch(`http://localhost:7007/stud/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => responsesDiv.innerText += JSON.stringify(data) + '\n')
    .catch((error) => console.error('Error:', error));
}
function updateStudentById(id, fname, lname, email) {
    fetch(`http://localhost:7007/stud/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fname, lname, email }),
    })
    .then(response => response.json())
    .then(data => responsesDiv.innerText += JSON.stringify(data) + '\n')
    .catch((error) => console.error('Error:', error));
}