"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Upload, X, Check, Loader2, ImagePlus } from "lucide-react";
import apiClient from "@/lib/api-client";

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspect?: number;
  aspectLabel?: string;
}

async function getCroppedBlob(imageSrc: string, crop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas is empty"));
    }, "image/jpeg", 0.9);
  });
}

export default function SingleImageUploader({ label, value, onChange, aspect = 16 / 9, aspectLabel }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value);

  // Sync local input when parent config reloads (e.g. after API fetch on mount)
  useEffect(() => {
    setUrlInput(value);
  }, [value]);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedArea(croppedPixels);
  }, []);

  const handleFile = (file: File) => {
    setPendingSrc(URL.createObjectURL(file));
    setPendingFile(file);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  };

  const handleConfirmCrop = async () => {
    if (!pendingSrc || !croppedArea || !pendingFile) return;
    setUploading(true);
    try {
      const blob = await getCroppedBlob(pendingSrc, croppedArea);
      const formData = new FormData();
      formData.append("file", blob, pendingFile.name);
      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url: string = res.data?.data?.url;
      if (url) {
        onChange(url);
        setUrlInput(url);
      }
      setPendingSrc(null);
      setPendingFile(null);
    } catch {
      // error handled by apiClient
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (v: string) => {
    setUrlInput(v);
    onChange(v);
  };

  return (
    <div className="space-y-2">
      {/* Crop modal */}
      {pendingSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-navy-800">Crop {label}</p>
                {aspectLabel && (
                  <p className="text-xs text-gray-500 mt-0.5">Aspect ratio: {aspectLabel}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => { setPendingSrc(null); setPendingFile(null); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative bg-gray-900" style={{ height: 280 }}>
              <Cropper
                image={pendingSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-10">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-gold-500"
                />
                <span className="text-xs text-gray-400 w-8 text-right">{zoom.toFixed(1)}×</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setPendingSrc(null); setPendingFile(null); }}
                className="admin-btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCrop}
                disabled={uploading || !croppedArea}
                className="admin-btn-primary text-sm flex items-center gap-2"
              >
                {uploading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                {uploading ? "Uploading..." : "Apply & Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
        {label}
      </label>

      {/* URL input + Browse button row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg or browse below"
          className="admin-input flex-1 text-sm"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-2 text-xs font-medium text-navy-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
        >
          <Upload size={13} />
          Browse
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          (e.target as HTMLInputElement).value = "";
        }}
      />

      {/* Preview */}
      {urlInput && (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
          <div
            className="relative overflow-hidden"
            style={{ paddingBottom: `${(1 / aspect) * 100}%` }}
          >
            <img
              src={urlInput}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[10px] text-white hover:bg-black/80 transition-colors"
            >
              <ImagePlus size={11} />
              Change
            </button>
            <button
              type="button"
              onClick={() => { onChange(""); setUrlInput(""); }}
              className="flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[10px] text-white hover:bg-red-600 transition-colors"
            >
              <X size={11} />
              Remove
            </button>
          </div>
          {aspectLabel && (
            <div className="absolute top-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
              {aspectLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
