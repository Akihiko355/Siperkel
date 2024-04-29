var names = [];
var selectedNames = {
    'moderator': [],
    'presentator1': [],
    'presentator2': [],
    'pertanyaan': [],
    'jawaban': []
};

function spin(task) {
    var namesInput = document.getElementById('namesInput').value;
    // Membersihkan input nama dari karakter selain huruf alfabet
    names = namesInput.replace(/[^a-zA-Z\n]/g, '').split('\n').map(name => name.trim()).filter(name => name !== '');

    if (names.length === 0) {
        alert("Masukkan setidaknya satu nama.");
        return;
    }

    var selectedNameIndex = Math.floor(Math.random() * names.length);
    var selectedName = names[selectedNameIndex];

    if (selectedNames[task].includes(selectedName)) {
        alert("Nama ini sudah dipilih untuk tugas ini.");
        return;
    }

    selectedNames[task].push(selectedName);
    displayResult(task, selectedName);
    updateInputNames(selectedName);
}

function reset() {
    selectedNames = {
        'moderator': [],
        'presentator1': [],
        'presentator2': [],
        'pertanyaan': [],
        'jawaban': []
    };

    document.querySelectorAll('.result').forEach(function(elem) {
        elem.textContent = '';
    });

    document.getElementById('namesInput').value = '';
}

function updateInputNames(selectedName) {
    var index = names.indexOf(selectedName);
    if (index !== -1) {
        names.splice(index, 1);
        document.getElementById('namesInput').value = names.join('\n');
    }
}

function displayResult(task, name) {
    var taskResultDiv = document.getElementById(task.toLowerCase() + 'Result');
    var nameDiv = document.createElement('div');
    nameDiv.textContent = name;
    taskResultDiv.appendChild(nameDiv);
}
