import { useState } from 'react';

const News = () => {
    const apiNKey = '03cfd6766b0244baa1a725ec8b38eeb9';
    const [news, setNews] = useState([]);//set the initial state to an empty array
    const [category, setCategory] = useState('general');
    const [query, setQuery] = useState('');
    const [isError, setIsError] = useState(false);
    const language = localStorage.getItem('newsLanguage') || 'en';

    const fetchNews = async () => {
        
        setIsError(false); // Reset error state on new fetch
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiNKey}&pageSize=6&language=${language}&category=${category}`;
        if (query) {
            url += `&q=${query}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.articles) {
                setNews(data.articles);
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            setIsError(true);
        }
    };

    return (
        <div>
            <h1>News</h1>
            <select className='dropdown' onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <br />
            <br />
            <div className="search-container">
                <input className='txt-input' type="text" placeholder="Search news" onChange={(e) => setQuery(e.target.value)} value={query} />
                <button onClick={fetchNews}>
                    <img src="public/search.png" height={22} width={22} alt="Search" />
                </button>
            </div>
            <br />
            <div>
                {isError && <p>Not available at the moment, please come back later :)</p>}
                {Array.isArray(news) && news.map((article, index) => (
                    <div key={index}>
                        <h2>{article.title}</h2>
                        <button onClick={() => window.open(article.url, "_blank")}>Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
