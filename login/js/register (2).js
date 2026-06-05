document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Mengaktifkan loading atau teks pada tombol jika diperlukan
    console.log("Mencoba mendaftarkan user:", username);

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        // Membaca respon mentah dari server sebagai teks terlebih dahulu untuk menghindari crash JSON
        const responseText = await res.text();
        console.log("Respon mentah dari server:", responseText);

        // Mengubah teks ke objek JSON secara aman
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("Gagal membaca JSON. Respon server bukan JSON yang valid:", jsonError);
            alert("Terjadi kesalahan pada respon server. Silahkan cek console.");
            return;
        }

        // Cek status dari API
        if (data.status === "success" || data.status === true) {
            alert("Registrasi Berhasil! Mengalihkan ke halaman login...");
            // Jika file register dan login kamu ada di folder yang sama:
            window.location.href = "index.html"; 
        } else {
            // Menampilkan pesan error dari API jika ada
            alert("Registrasi Gagal: " + (data.message || "Username/Email mungkin sudah terdaftar."));
        }

    } catch (error) {
        console.error("Terjadi error saat fetch:", error);
        alert("Gagal terhubung ke server. Pastikan koneksi internet aktif.");
    }
});
