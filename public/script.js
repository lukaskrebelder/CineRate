fetch("/api/status")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("status").textContent =
      data.nachricht + " (Filme in DB: " + data.filmeInDb + ")";
  })
  .catch(() => {
    document.getElementById("status").textContent = "Backend nicht erreichbar";
  });
