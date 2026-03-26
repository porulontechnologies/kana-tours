"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2, Plane } from "lucide-react";
import apiClient from "@/lib/api-client";

interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryName?: string;
  subType: string;
}

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (iata: string, label: string) => void;
}

export default function AirportSearch({ label, placeholder = "City or airport", value, onChange }: Props) {
  const [displayValue, setDisplayValue] = useState("");
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) setDisplayValue("");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        if (!value) setDisplayValue("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const fetchSuggestions = useCallback(async (kw: string) => {
    if (kw.length < 2) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await apiClient.get("/flights/airports", { params: { keyword: kw } });
      setSuggestions(res.data.data || []);
      setOpen(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 280);
  };

  const handleSelect = (airport: Airport) => {
    const formatted = `${airport.cityName} (${airport.iataCode})`;
    setDisplayValue(formatted);
    setSuggestions([]);
    setOpen(false);
    onChange(airport.iataCode, formatted);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-navy-700 mb-1.5">{label}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={displayValue}
          onChange={handleInput}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder={placeholder}
          className="admin-input pl-9 pr-8"
          autoComplete="off"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 animate-spin" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((airport, idx) => (
            <button
              key={`${airport.iataCode}-${airport.subType}-${idx}`}
              type="button"
              onClick={() => handleSelect(airport)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-50 text-left transition-colors border-b border-gray-50 last:border-0"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                airport.subType === "AIRPORT" ? "bg-blue-50" : "bg-navy-50"
              }`}>
                {airport.subType === "AIRPORT"
                  ? <Plane className="h-3.5 w-3.5 text-blue-500" />
                  : <MapPin className="h-3.5 w-3.5 text-navy-600" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-800">
                  {airport.cityName}
                  <span className="ml-2 text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {airport.iataCode}
                  </span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {airport.name}{airport.countryName ? ` · ${airport.countryName}` : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
