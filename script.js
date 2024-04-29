function spin() {
    var namesInput = document.getElementById('namesInput').value;
    var numGroupsInput = document.getElementById('numGroupsInput').value;

    // Memeriksa apakah input nama dan jumlah kelompok tidak kosong
    if (namesInput.trim() === '') {
        alert('Masukkan setidaknya satu nama!');
        return;
    }

    if (numGroupsInput.trim() === '') {
        alert('Masukkan jumlah kelompok!');
        return;
    }

    // Membersihkan input nama dari karakter selain huruf alfabet
    var cleanedNamesInput = namesInput.replace(/[^a-zA-Z\n]/g, '');
    
    var numGroups = parseInt(numGroupsInput);
    var names = cleanedNamesInput.split('\n').map(name => name.trim()).filter(name => name !== ' ');
    var shuffledNames = shuffleArray(names);

    var groupedNames = groupNames(shuffledNames, numGroups);

    displayResult(groupedNames);
}

// Fungsi lainnya seperti yang sudah Anda tulis

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function groupNames(names, numGroups) {
    var groupedNames = new Array(numGroups).fill().map(() => []);

    for (var i = 0; i < names.length; i++) {
        var groupName = i % numGroups;
        groupedNames[groupName].push(names[i]);
    }

    return groupedNames;
}

function displayResult(groupedNames) {
    var spinResult = document.getElementById('spinResult');
    spinResult.innerHTML = '';

    groupedNames.forEach(function(group, index) {
        var groupDiv = document.createElement('div');
        groupDiv.innerHTML = '<strong>Kelompok ' + (index + 1) + ':</strong><br>' + group.map((name, idx) => (idx + 1) + '. ' + name).join('<br>');
        spinResult.appendChild(groupDiv);
    });
}
