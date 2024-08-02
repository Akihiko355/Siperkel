// Fungsi untuk menghitung jarak Levenshtein
function levenshteinDistance(a, b) {
    const dp = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[0][i] = i;
    for (let i = 0; i <= b.length; i++) dp[i][0] = i;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }

    return dp[b.length][a.length];
}

// Fungsi untuk mencari nama yang mirip
function findSimilarNames(names) {
    const threshold = 3; // Jarak Levenshtein maksimum yang dianggap mirip
    const minLength = 3; // Panjang minimum nama untuk dianggap mirip
    const similarNames = [];

    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            const distance = levenshteinDistance(names[i], names[j]);
            if (names[i].length >= minLength && names[j].length >= minLength && distance <= threshold) {
                similarNames.push([names[i], names[j]]);
            }
        }
    }

    return similarNames;
}

// Fungsi untuk mencari nama yang sama
function findDuplicateNames(names) {
    var nameCounts = {};
    var duplicates = [];

    names.forEach(function(name) {
        nameCounts[name] = (nameCounts[name] || 0) + 1;
    });

    for (var name in nameCounts) {
        if (nameCounts[name] > 1) {
            duplicates.push(name);
        }
    }

    return duplicates;
}

// Fungsi untuk format pesan nama duplikat
function formatDuplicateMessage(duplicates) {
    if (duplicates.length === 0) return '';

    if (duplicates.length === 1) {
        return 'Terdapat nama yang sama yaitu: ' + duplicates[0];
    }

    var lastName = duplicates.pop();
    return 'Terdapat nama yang sama yaitu: ' + duplicates.join(', ') + ', dan ' + lastName;
}

// Fungsi untuk format pesan nama mirip
function formatSimilarMessage(similarNames) {
    if (similarNames.length === 0) return '';

    var message = 'Terdapat nama yang hampir sama:\n';
    similarNames.forEach(pair => {
        message += `"${pair[0]}" dan "${pair[1]}"\n`;
    });
    message += 'Apakah Anda sudah memasukkan nama dengan benar?';
    return message;
}

// Fungsi untuk mengacak array
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

// Fungsi untuk membagi nama menjadi kelompok
function groupNames(names, numGroups) {
    var groupedNames = new Array(numGroups).fill().map(() => []);

    for (var i = 0; i < names.length; i++) {
        var groupName = i % numGroups;
        groupedNames[groupName].push(names[i]);
    }

    return groupedNames;
}

// Fungsi untuk menampilkan hasil
function displayResult(groupedNames) {
    var spinResult = document.getElementById('spinResult');
    var spinBoxResult = document.getElementById('spinBoxResult');

    spinResult.innerHTML = '';
    spinBoxResult.innerHTML = '';

    groupedNames.forEach(function(group, index) {
        var groupDiv = document.createElement('div');
        groupDiv.innerHTML = '<strong>Kelompok ' + (index + 1) + ':</strong><br>' + group.map((name, idx) => (idx + 1) + '. ' + name).join('<br>');
        spinResult.appendChild(groupDiv);
    });

    // Menampilkan hasil spin tambahan jika ada
    spinBoxResult.innerHTML = '<strong>Hasil Spin Tambahan:</strong><br>' + groupedNames.map((group, index) => '<strong>Kelompok ' + (index + 1) + ':</strong><br>' + group.map((name, idx) => (idx + 1) + '. ' + name).join('<br>')).join('<br><br>');
}

// Fungsi untuk melakukan spin
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

    // Membersihkan input nama dari karakter selain huruf alfabet, angka, titik, dan spasi awal
    var cleanedNamesInput = namesInput.split('\n')
                                      .map(name => name.replace(/^[0-9. ]+/, '').trim())
                                      .join('\n');
    
    var numGroups = parseInt(numGroupsInput);
    var names = cleanedNamesInput.split('\n').map(name => name.trim()).filter(name => name !== '');

    // Memeriksa apakah ada nama yang sama atau hampir sama
    var duplicateNames = findDuplicateNames(names);
    var similarNames = findSimilarNames(names);
    if (duplicateNames.length > 0) {
        var message = formatDuplicateMessage(duplicateNames);
        alert(message);
        return;
    }

    if (similarNames.length > 0) {
        var message = formatSimilarMessage(similarNames);
        alert(message);
        return;
    }

    var shuffledNames = shuffleArray(names);
    var groupedNames = groupNames(shuffledNames, numGroups);

    displayResult(groupedNames);
}

// Fungsi untuk menyalin hasil
function copyResult() {
    var spinResult = document.getElementById('spinResult').innerText;
    if (spinResult.trim() === '') {
        alert('Hasil spin tidak tersedia');
        return;
    }
    navigator.clipboard.writeText(spinResult).then(() => {
        var copyButton = document.getElementById('get-copy-button');
        copyButton.textContent = 'Copy Selesai';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1000);
    }).catch(err => {
        console.error('Gagal Copy: ', err);
    });
}

function findDuplicateNames(names) {
    var nameCounts = {};
    var duplicates = [];

    names.forEach(function(name) {
        nameCounts[name] = (nameCounts[name] || 0) + 1;
    });

    for (var name in nameCounts) {
        if (nameCounts[name] > 1) {
            duplicates.push(name);
        }
    }

    return duplicates;
}

function findSimilarNames(names) {
    var similarNames = [];
    for (var i = 0; i < names.length; i++) {
        for (var j = i + 1; j < names.length; j++) {
            if (names[i].includes(names[j]) || names[j].includes(names[i])) {
                similarNames.push([names[i], names[j]]);
            }
        }
    }
    return similarNames;
}

function formatDuplicateMessage(duplicates) {
    if (duplicates.length === 0) return '';

    if (duplicates.length === 1) {
        return 'Terdapat nama yang sama yaitu: ' + duplicates[0];
    }

    var lastName = duplicates.pop();
    return 'Terdapat nama yang sama yaitu: ' + duplicates.join(', ') + ', dan ' + lastName;
}

function formatSimilarMessage(similarNames) {
    if (similarNames.length === 0) return '';

    var message = 'Terdapat nama yang hampir sama:\n';
    similarNames.forEach(pair => {
        message += `"${pair[0]}" dan "${pair[1]}"\n`;
    });
    message += 'Apakah Anda sudah memasukkan nama dengan benar?';
    return message;
}

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

const baseText = "Make life $ use $ by Akihiko355 @2024";
const simplefedText = "$Simplefed";
const javascriptText = "$JavaScript";
const animatedTextElement = document.getElementById('animated-text');

let phase = 0;
let delay = 0;

const steps = [
    "Make life $S with $ by Akihiko355 @2024",
    "Make life $Si with $ by Akihiko355 @2024",
    "Make life $Sim with $ by Akihiko355 @2024",
    "Make life $Simp with $ by Akihiko355 @2024",
    "Make life $Simpl with $ by Akihiko355 @2024",
    "Make life $Simple with $ by Akihiko355 @2024",
    "Make life $Simplef with $ by Akihiko355 @2024",
    "Make life $Simplefe with $ by Akihiko355 @2024",
    "Make life $Simplefed with $ by Akihiko355 @2024",
    "Make life $Simplefed with $J by Akihiko355 @2024",
    "Make life $Simplefed with $Ja by Akihiko355 @2024",
    "Make life $Simplefed with $Jav by Akihiko355 @2024",
    "Make life $Simplefed with $Java by Akihiko355 @2024",
    "Make life $Simplefed with $JavaS by Akihiko355 @2024",
    "Make life $Simplefed with $JavaSc by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScr by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScri by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScrip by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScript by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScrip by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScri by Akihiko355 @2024",
    "Make life $Simplefed with $JavaScr by Akihiko355 @2024",
    "Make life $Simplefed with $JavaSc by Akihiko355 @2024",
    "Make life $Simplefed with $JavaS by Akihiko355 @2024",
    "Make life $Simplefed with $Java by Akihiko355 @2024",
    "Make life $Simplefed with $Jav by Akihiko355 @2024",
    "Make life $Simplefed with $Ja by Akihiko355 @2024",
    "Make life $Simplefed with $J by Akihiko355 @2024",
    "Make life $Simplefed with $ by Akihiko355 @2024",
    "Make life $Simplefe with $ by Akihiko355 @2024",
    "Make life $Simplef with $ by Akihiko355 @2024",
    "Make life $Simple with $ by Akihiko355 @2024",
    "Make life $Simpl with $ by Akihiko355 @2024",
    "Make life $Simp with $ by Akihiko355 @2024",
    "Make life $Sim with $ by Akihiko355 @2024",
    "Make life $Si with $ by Akihiko355 @2024",
    "Make life $S with $ by Akihiko355 @2024",
    "Make life $ with $ by Akihiko355 @2024"
];

function animateText() {
    if (delay > 0) {
        delay--;
        return;
    }

    animatedTextElement.innerHTML = steps[phase];

    phase++;

    if (phase === steps.length) {
        phase = 0;
        delay = 2; // 2-second delay
    } else if (phase === 9) { // 1-second delay after "$Simplefed" animation
        delay = 5;
    } else if (phase === 19) { // 2-second delay after "$JavaScript" animation
        delay = 10;
    }
}

setInterval(animateText, 200);
