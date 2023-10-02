import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsDetail from "./NewsDetail";

function NewsList() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              category: selectedCategory,
              apiKey: "080a15e0f4e446628890152cdd39ba5b",
              pageSize: 10,
              q: searchKeyword,
            },
          }
        );

        setNews(response.data.articles);
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil berita.");
      }
    };

    fetchData();
  }, [selectedCategory, searchKeyword]);

  const categories = ["General", "Business", "Technology", "Sports"];

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r">
        <div className="container mx-auto p-4 bg-blue-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Breaking News</h2>
          <div className="mb-4 flex flex-wrap items-center space-x-2">
            <label className="mr-2 text-2xl flex font-semibold text-gray-800">
              Category:
            </label>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-blue-950 text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-md px-4 py-2 mb-2`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="mr-7 text-gray-800 text-2xl flex font-semibold ">
              Search:
            </label>
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearch}
              placeholder="Search..."
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {selectedArticle && (
        <NewsDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <li
            key={article.title}
            className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => handleArticleClick(article)} // Handle klik pada artikel
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              className="mb-2 max-w-full h-auto"
            />
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600">
              {article.source.name} -{" "}
              {new Date(article.publishedAt).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
