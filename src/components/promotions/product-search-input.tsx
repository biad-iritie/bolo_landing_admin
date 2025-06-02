"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useProductStore } from "@/lib/store/product-store";
import { ProductSearchResult, ProductCategory } from "@/lib/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ProductSearchInputProps {
  value: string;
  onChange: (value: string, product?: ProductSearchResult) => void;
  onBlur?: () => void;
  category?: ProductCategory;
  partnerId: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function ProductSearchInput({
  value,
  onChange,
  onBlur,
  category,
  partnerId,
  label = "Produit",
  placeholder = "Rechercher un produit...",
  error,
  className,
}: ProductSearchInputProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const debouncedSearch = useDebounce(inputValue, 300);
  const searchProducts = useProductStore((state) => state.searchProducts);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearch) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchProducts({
          query: debouncedSearch,
          category,
          partnerId,
        });
        setSuggestions(results);
      } catch (error) {
        console.error("Error searching products:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedSearch, category, partnerId, searchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (product: ProductSearchResult) => {
    setInputValue(product.name);
    onChange(product.name, product);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="space-y-2">
        <Label htmlFor="product-search">{label}</Label>
        <Input
          id="product-search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(error && "border-red-500")}
          autoComplete="off"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {showSuggestions && (inputValue || isSearching) && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {isSearching ? (
            <div className="p-2 text-sm text-gray-500">
              Recherche en cours...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-gray-500">
                    {product.category} - {product.regularPrice.toLocaleString()}{" "}
                    FCFA
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-sm text-gray-500">
              Aucun produit trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}
