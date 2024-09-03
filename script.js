const containerFilm = document.querySelector("#container-film");
const loader = document.querySelector("#loader");
const formWrapper = document.querySelector("#form-wrapper");

const apiUrl =
  "https://newsapi.org/v2/everything?q=film&from=2024-09-02&sortBy=publishedAt&apiKey=b99bfac3612f40f6bb28dfab990cde8d";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // Обрезаем массив до 50 элементов
    const films = data.articles.slice(0, 5);
    films.map((film) => {
      const card = document.createElement("div");
      card.className = "film-card";

      const title = document.createElement("h3");
      title.textContent = `Title: ${film.title}`;

      const description = document.createElement("p");
      description.textContent = `Description: ${film.description}`;

      const author = document.createElement("h4");
      author.textContent = `Author: ${film.author}`;

      const publishedAt = document.createElement("p");
      publishedAt.textContent = `Published At: ${film.publishedAt}`;

      const sourceName = document.createElement("p");
      sourceName.textContent = `Source name: ${film.source.name}`;

      const content = document.createElement("p");
      content.textContent = `content : ${film.content}`;

      const img = document.createElement("img");
      if (film.urlToImage) {
        img.src = film.urlToImage;
        img.alt = film.title;
        img.style.width = "100%";
        img.style.height = "auto";
      } else {
        img.alt = "No image available";
      }
      loader.classList.toggle("loader-hide");
      card.append(
        img,
        title,
        author,
        description,
        film.source.name,
        publishedAt,
        film.content
      );
      containerFilm.append(card);
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    loader.classList.toggle("loader-hide");

    const serverError = document.createElement("p");
    serverError.classList.add("error-message");
    serverError.style.color = "red";
    if (error.message === "Failed to fetch") {
      serverError.textContent = `Server error: не получилось отправить запрос 😞`;
    } else {
      serverError.textContent = `Server error: ${error.message} 😞`;
    }
    containerFilm.append(serverError);
  }
}
loader.classList.toggle("loader-hide");
fetchData();
