const API_KEY = "d013186039544f31bdb0c3b86896220f";

function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");

  if (!fileInput.files.length) {
    alert("Pilih gambar terlebih dahulu.");
    return;
  }

  const image = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", image);

  resultDiv.innerHTML = "Mengupload gambar...";

  fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const imageUrl = data.data.url;
        const date = new Date().toLocaleDateString("id-ID", {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          timeZone: 'Asia/Jakarta'
        });

        resultDiv.innerHTML = `
          ✅ Gambar berhasil diupload!<br><br>
          🔗 <strong>Link:</strong><br>
          <a href="${imageUrl}" target="_blank">${imageUrl}</a><br><br>
          📅 <strong>Tanggal Upload:</strong> ${date}
        `;
      } else {
        resultDiv.innerHTML = "❌ Upload gagal.";
      }
    })
    .catch(() => {
      resultDiv.innerHTML = "❌ Terjadi kesalahan saat upload.";
    });
}
