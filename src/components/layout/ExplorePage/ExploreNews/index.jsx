import React, { useEffect, useState } from "react";
import Parser from "rss-parser";

const ExploreRSS = () => {
  const [items, setItems] = useState([]);
  const parser = new Parser();

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const feed = await parser.parseURL("http://www.beyazperde.com/rss/haberler.xml"); // Beyazperde RSS URL
        console.log(feed.items);
      } catch (error) {
        console.error("RSS Feed Hatası:", error);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div>
      <h2>Haberler</h2>
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.contentSnippet}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Habere Git
            </a>
          </div>
        ))
      ) : (
        <p>Haberler yükleniyor...</p>
      )}
    </div>
  );
};

export default ExploreRSS;
