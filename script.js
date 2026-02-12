const clock = document.getElementById('clock');
const hourHand = document.getElementById('hour');
const minHand = document.getElementById('min');
const secHand = document.getElementById('sec');

/**
 * Membuat elemen visual angka dan garis detik secara dinamis
 */
function initClock() {
    // 1. Buat 60 Garis Detik
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        if (i % 5 === 0) tick.classList.add('large');
        tick.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
        clock.appendChild(tick);
    }

    // 2. Buat 12 Angka Jam
    for (let i = 1; i <= 12; i++) {
        const num = document.createElement('div');
        num.className = 'number';
        const rotation = i * 30;
        num.style.transform = `rotate(${rotation}deg)`;
        
        const span = document.createElement('span');
        span.innerText = i;
        span.style.display = 'inline-block';
        span.style.transform = `rotate(-${rotation}deg)`;
        
        num.appendChild(span);
        clock.appendChild(num);
    }
}

/**
 * Memperbarui posisi jarum jam setiap detik
 */
function updateClock() {
    const now = new Date();
    
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Kalkulasi Derajat
    const secDeg = (seconds / 60) * 360;
    const minDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

    // Fix Bug: Hindari putaran cepat 360 derajat saat kembali ke angka 12 (detik 0)
    if (seconds === 0) {
        secHand.style.transition = 'none';
    } else {
        secHand.style.transition = 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
    }

    // Terapkan Rotasi
    secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

// Jalankan fungsi
initClock();
setInterval(updateClock, 1000);
updateClock(); // Langsung jalankan tanpa menunggu detik berikutnya
