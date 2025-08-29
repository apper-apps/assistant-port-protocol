import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ProductSearchInterface from "@/components/organisms/ProductSearchInterface";

const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    } else {
      setSearchQuery("");
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim()) {
      setSearchQuery(newQuery);
      navigate(`/search/${encodeURIComponent(newQuery)}`);
      
      // Add to search history
      setSearchHistory(prev => {
        const updated = [newQuery, ...prev.filter(q => q !== newQuery)].slice(0, 10);
        localStorage.setItem('supplyScan_searchHistory', JSON.stringify(updated));
        return updated;
      });
    } else {
      navigate("/");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/");
  };

  // Load search history on mount
  useEffect(() => {
    const saved = localStorage.getItem('supplyScan_searchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
    }
  }, []);

  return (
    <Layout
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onClearSearch={handleClearSearch}
      searchHistory={searchHistory}
    >
      <ProductSearchInterface
        query={searchQuery}
        onSearch={handleSearch}
        className="flex-1"
      />
    </Layout>
  );
};

export default SearchPage;