// Ürünleri API'den çeken fonksiyon
async function productFetchData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("API Hatası: " + error);
  }
}

// Kategorileri oluşturup render eden fonksiyon
const categoryList = (products) => {
  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];
  renderCategory(uniqueCategories);
};

// Kategorileri <select> içinde gösteren fonksiyon
const renderCategory = (categories) => {
  const select = document.getElementById("select");
  select.innerHTML = `<option value="All">Tüm Kategoriler</option>`; // Tüm Kategoriler seçeneği ekledik
  categories.forEach((category) => {
    select.innerHTML += `<option value="${category}">${category}</option>`;
  });
};

// Ürün filtreleme

// Kategoriye göre ürünleri filtreleyen fonksiyon
const filterProductsByCategory = (category, products) => {
  if (category === "All") {
    return products; // Tüm kategoriler seçildiyse tüm ürünleri göster
  }
  return products.filter((product) => product.category === category);
};

// Kategori değiştiğinde çalışan fonksiyon
const handleCategoryChange = (event, products) => {
  const selectedValue = event.target.value;
  const filtered = filterProductsByCategory(selectedValue, products);
  renderProducts(filtered);
};

// Kategori seçim değişikliğini başlatan fonksiyon
const initCategoryFilter = (products) => {
  const select = document.getElementById("select");
  select.addEventListener("change", (event) => {
    handleCategoryChange(event, products);
  });
};

// -----------------------

// Ürünleri ekrana basan fonksiyon
const renderProducts = (products) => {
  const productRow = document.getElementById("products");
  productRow.innerHTML = ""; // Önceki ürünleri temizle

  const productItems = products.map((product) => {
    const li = document.createElement("li");

    // Ürün resmi
    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("productImage");

    // Ürün değerlendirmesi
    const rating = product.rating.rate;
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.textContent = `Ürün Değerlendirmesi: ${rating}`;

    // Ürün başlığı ve fiyatı
    const productTitle = product.title;
    const price = (product.price * 1.2).toFixed(2);
    li.textContent = `${productTitle} - Fiyatı : $${price}`;
    li.appendChild(image);
    li.appendChild(paragraph);

    return li;
  });

  productItems.forEach((item) => {
    productRow.appendChild(item);
  });
};

// API'den verileri çek ve kategori filtrelemeyi başlat
productFetchData().then((products) => {
  renderProducts(products); // Tüm ürünleri başta göster
  categoryList(products); // Kategorileri doldur
  initCategoryFilter(products); // Kategori filtrelemeyi başlat
});
