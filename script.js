// Data Kamus Sederhana (Kata Inggris sebagai Kunci)
const dictionary = {
    // Inggris : Indonesia
    "hello": "halo",
    "cat": "kucing",
    "dog": "anjing",
    "house": "rumah",
    "car": "mobil",
    "water": "air",
    "book": "buku",
    "computer": "komputer",
    "happy": "bahagia",
    "friend": "teman"
};

// Fungsi untuk membalikkan kamus (Indonesia : Inggris)
function reverseDictionary(dict) {
    const reversed = {};
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            // Nilai (Indonesia) menjadi Kunci, dan Kunci (Inggris) menjadi Nilai
            reversed[dict[key]] = key;
        }
    }
    return reversed;
}

const reversedDictionary = reverseDictionary(dictionary);

// Elemen DOM
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const directionRadios = document.querySelectorAll('input[name="direction"]');

let currentDirection = 'en-id'; // Arah default: Inggris -> Indonesia

// Event Listener untuk perubahan arah terjemahan
directionRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        currentDirection = event.target.value;
        // Bersihkan hasil dan input saat arah berubah
        searchInput.value = '';
        resultsDiv.innerHTML = '<p class="placeholder">Hasil terjemahan akan muncul di sini.</p>';
        
        // Atur placeholder input sesuai arah
        if (currentDirection === 'en-id') {
             searchInput.placeholder = 'Ketik kata Inggris...';
        } else {
             searchInput.placeholder = 'Ketik kata Indonesia...';
        }
    });
});

// Jalankan pengaturan placeholder awal
document.addEventListener('DOMContentLoaded', () => {
    searchInput.placeholder = 'Ketik kata Inggris...';
});


// Fungsi Pencarian Utama
function searchDictionary() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let currentDict;
    let fromLang, toLang;

    // 1. Tentukan kamus dan label bahasa berdasarkan arah
    if (currentDirection === 'en-id') {
        currentDict = dictionary;
        fromLang = "Inggris";
        toLang = "Indonesia";
    } else { // id-en
        currentDict = reversedDictionary;
        fromLang = "Indonesia";
        toLang = "Inggris";
    }

    // Tampilkan pesan placeholder jika input kosong
    if (searchTerm === "") {
        resultsDiv.innerHTML = '<p class="placeholder">Hasil terjemahan akan muncul di sini.</p>';
        return;
    }

    // 2. Cari terjemahan
    const translation = currentDict[searchTerm];

    // 3. Tampilkan hasil
    if (translation) {
        resultsDiv.innerHTML = `
            <div class="result-item">
                Dari **${fromLang}**: **${searchTerm}**<br>
                Ke **${toLang}**: **${translation}**
            </div>
        `;
    } else {
        resultsDiv.innerHTML = `
            <p class="placeholder">Kata "**${searchTerm}**" tidak ditemukan dalam kamus ${fromLang} → ${toLang} ini.</p>
        `;
    }
}
