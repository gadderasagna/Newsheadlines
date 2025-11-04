// ===============================
// News Headlines Viewer with Search
// ===============================

const apiKey = "ca00c8babaa8453eb7b2c5924a6446c3"; // Replace with your actual NewsAPI key
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Fetch and display top headlines (default)
async function fetchNews() {
  newsContainer.innerHTML = "<p>Loading latest headlines...</p>";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>⚠️ Failed to load news. Try again later.</p>";
  }
}

// Fetch and display search results
async function searchNews(query) {
  newsContainer.innerHTML = `<p>Searching for "${query}"...</p>`;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error searching news:", error);
    newsContainer.innerHTML = "<p>⚠️ Failed to search news. Try again later.</p>";
  }
}

// Display fetched news articles
function displayNews(articles) {
  newsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found.</p>";
    return;
  }

  articles.forEach(article => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.style.background = "#f9f9f9";
    newsItem.style.padding = "15px";
    newsItem.style.marginBottom = "15px";
    newsItem.style.borderRadius = "8px";
    newsItem.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

    newsItem.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(newsItem);
  });
}

// Load default top headlines when page loads
fetchNews();

// Search button click event
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchNews(query);
  } else {
    fetchNews();
  }
});

// Optional: Press Enter to search
searchInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
