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
  value: string;           // the IATA code stored in state
  onChange: (iata: string, label: string) => void;
}

export default function AirportSearch({ label, placeholder = "City or airport", value, onChange }: Props) {
  const [query, setQuery] = useState("");          // display text while typing
  const [displayValue, setDisplayValue] = useState(""); // shown in the input
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync display when external value changes (e.g. on form reset)
  useEffect(() => {
    if (!value) setDisplayValue("");
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If user typed but didn't select, revert to last confirmed value
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
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 280);
  };

  const handleSelect = (airport: Airport) => {
    const formatted = `${airport.cityName} (${airport.iataCode})`;
    setDisplayValue(formatted);
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    onChange(airport.iataCode, formatted);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="agent-label">{label}</label>
      <div className="relative">
        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={displayValue}
          onChange={handleInput}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder={placeholder}
          className="agent-input pl-9 pr-8"
          autoComplete="off"
        />
        {loading && (
          <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
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
                airport.subType === "AIRPORT" ? "bg-sky-100" : "bg-navy-50"
              }`}>
                {airport.subType === "AIRPORT"
                  ? <Plane size={14} className="text-sky-600" />
                  : <MapPin size={14} className="text-navy-600" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-800">
                  {airport.cityName}
                  <span className="ml-2 text-xs font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">
                    {airport.iataCode}
                  </span>
                </p>
                <p className="text-xs text-gray-500 truncate">{airport.name}{airport.countryName ? ` · ${airport.countryName}` : ""}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
