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
    // Membersihkan input nama dari angka, titik, dan spasi di awal
    names = namesInput.split('\n').map(name => cleanName(name)).filter(name => name !== '');

    if (names.length === 0) {
        alert("Masukkan setidaknya satu nama.");
        return;
    }

    if (selectedNames[task].length > 0) {
        alert("Tugas ini sudah memiliki nama yang dipilih.");
        return;
    }

    var selectedNameIndex = Math.floor(Math.random() * names.length);
    var selectedName = names[selectedNameIndex];

    if (isNameAlreadySelected(selectedName)) {
        alert("Nama ini sudah dipilih untuk tugas lain.");
        return;
    }

    selectedNames[task].push(selectedName);
    displayResult(task, selectedName);
    updateInputNames(selectedName);
}

function cleanName(name) {
    // Menghapus angka, titik, dan spasi di awal
    return name.replace(/^[\d. ]+/, '').trim();
}

function isNameAlreadySelected(name) {
    for (var task in selectedNames) {
        if (selectedNames[task].includes(name)) {
            return true;
        }
    }
    return false;
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
    taskResultDiv.innerHTML = '<span>' + name + '</span>';
    adjustFontSize(taskResultDiv);
}

function adjustFontSize(taskResultDiv) {
    var span = taskResultDiv.querySelector('span');
    var parentWidth = taskResultDiv.clientWidth;
    var parentHeight = taskResultDiv.clientHeight;

    var fontSize = 10;
    span.style.fontSize = fontSize + 'px';

    while (span.scrollWidth <= parentWidth && span.scrollHeight <= parentHeight && fontSize < 20) {
        fontSize++;
        span.style.fontSize = fontSize + 'px';
    }

    fontSize--;
    span.style.fontSize = fontSize + 'px';
}
