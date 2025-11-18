// Data Kamus Utama (Inggris : Indonesia)
// Anda dapat menyalin dan menempelkan ribuan pasangan kata di dalam objek ini.
const dictionary = {
    // FORMAT: "kata_inggris": "kata_indonesia",

    // --- Contoh Kosakata Dasar (Bisa Dihapus/Diubah) ---
    "hello": "halo",
    "cat": "kucing",
    "dog": "anjing",
    "house": "rumah",
    "car": "mobil",
    "water": "air",
    "book": "buku",
    "computer": "komputer",
    "happy": "bahagia",
    "friend": "teman",
    "go": "pergi",
    "eat": "makan",
    "sleep": "tidur",
    "work": "kerja",
    "school": "sekolah",
    "city": "kota",
    "country": "negara",
    "beautiful": "indah",
    "big": "besar",
    "small": "kecil",
    "yesterday": "kemarin",
    "tomorrow": "besok",
    // ----------------------------------------------------

    // --- TEMPAT ANDA MEMASUKKAN KOSAKATA BARU ---
    "run": "lari",
    "jump": "lompat",
    "speak": "berbicara",
    "listen": "mendengarkan",
    "write": "menulis",
    "read": "membaca",
    "mountain": "gunung",
    "river": "sungai",
    "flower": "bunga",
    "tree": "pohon",
    "sun": "matahari",
    "moon": "bulan",
    "star": "bintang",
    "love": "cinta",
    "hate": "benci",
    "know": "tahu",
    "learn": "belajar",
    "teach": "mengajar",
    "family": "keluarga",
    "mother": "ibu",
    "father": "ayah",
    "sister": "saudara perempuan",
    "brother": "saudara laki-laki",
    "time": "waktu",
    "money": "uang",
    "job": "pekerjaan",
    "music": "musik",
    "movie": "film",
    "game": "permainan",
    "door": "pintu",
    "window": "jendela",
    "table": "meja",
    "chair": "kursi",
    // Tambahkan lebih banyak di sini...
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
    // Mengubah input menjadi lowercase dan menghapus spasi di awal/akhir
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
        // Tampilkan hasil dengan bold
        resultsDiv.innerHTML = `
            <div class="result-item">
                Dari **${fromLang}**: **${searchTerm}**<br>
                Ke **${toLang}**: **${translation}**
            </div>
        `;
    } else {
        // Tampilkan pesan jika tidak ditemukan
        resultsDiv.innerHTML = `
            <p class="placeholder">Kata "**${searchTerm}**" tidak ditemukan dalam kamus ${fromLang} → ${toLang} ini.</p>
        `;
    }
}
