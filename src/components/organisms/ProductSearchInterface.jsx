import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { supplierService } from "@/services/api/supplierService";

const ProductSearchInterface = ({ 
  query, 
  onSearch,
  className = "" 
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchProducts = async (searchQuery) => {
    if (!searchQuery?.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await supplierService.searchProducts(searchQuery);
      setProducts(results);
      
      if (results.length === 0) {
        toast.info("По вашему запросу товары не найдены");
      } else {
        toast.success(`Найдено ${results.length} товаров`);
      }
    } catch (err) {
      setError("Не удалось найти товары");
      toast.error("Ошибка поиска товаров");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  const handleProductClick = (product) => {
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Цена по запросу";
    return typeof price === 'string' ? price : `$${price}`;
  };

  if (loading) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <div className="p-6">
          <SearchBar
            onSearch={onSearch}
            placeholder="Введите название товара для поиска поставщиков..."
            autoFocus={!query}
            loading={loading}
            className="mb-8"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Loading type="search" />
        </div>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <div className="p-6">
          <SearchBar
            onSearch={onSearch}
            placeholder="Введите название товара для поиска поставщиков..."
            autoFocus
            className="mb-8"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Error message={error} onRetry={() => searchProducts(query)} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <SearchBar
          onSearch={onSearch}
          placeholder="Введите название товара для поиска поставщиков..."
          autoFocus={!query}
          loading={loading}
        />
        
        {query && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Search" size={16} />
              <span>Результаты поиска для: <strong>"{query}"</strong></span>
            </div>
            {products.length > 0 && (
              <span className="text-sm text-gray-500">
                Найдено: {products.length} товаров
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto">
        {!query ? (
          <Empty
            title="Начните поиск товаров"
            description="Введите название товара или категорию для поиска поставщиков на Alibaba и AliExpress"
            icon="Search"
            className="h-full"
          />
        ) : products.length === 0 && !loading ? (
          <Empty
            title="Товары не найдены"
            description={`По запросу "${query}" ничего не найдено. Попробуйте другие ключевые слова.`}
            icon="Package"
            actionText="Попробовать другой поиск"
            onAction={() => onSearch("")}
            className="h-full"
          />
        ) : (
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={product.image || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/placeholder-product.jpg';
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2">
                          <ApperIcon name="ExternalLink" size={16} className="text-gray-600" />
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <ApperIcon name="Star" size={14} className="text-yellow-400" />
                              <span className="text-sm text-gray-600">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>{product.supplier || "Поставщик"}</span>
                          {product.orders && (
                            <span>{product.orders} заказов</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <ApperIcon name="MapPin" size={12} />
                            <span>{product.location || "Китай"}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <ApperIcon name="Truck" size={12} />
                            <span>Быстрая доставка</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchInterface;