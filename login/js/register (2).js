document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        // Mengirim data register ke API yang sama dengan login
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // Perhatikan bagian action=register
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            alert("Registrasi Berhasil! Silahkan Login.");
            // Pindahkan ke halaman login (index.html tempat form login berada)
            window.location.href = "index.html"; 
        } else {
            // Jika username/email sudah terdaftar atau ada error lain dari API
            alert("Registrasi Gagal: " + (data.message || "Terjadi kesalahan"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal terhubung ke server registrasi.");
    }
});
