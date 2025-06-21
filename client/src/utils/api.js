const token = localStorage.getItem("token");

fetch("/api/produk", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
