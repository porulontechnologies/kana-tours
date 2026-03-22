"use client";

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { X, Upload, Crop, Check, ImagePlus, Loader2, GripVertical } from "lucide-react";
import apiClient from "@/lib/api-client";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  /** Crop aspect ratio — width / height. e.g. 4/3, 16/9, 3/2 */
  aspect?: number;
  aspectLabel?: string;
  maxImages?: number;
}

// Extract the cropped pixel area from an image element into a Blob
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

export default function MultiImageUploader({
  images,
  onChange,
  aspect = 4 / 3,
  aspectLabel,
  maxImages = 10,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accumulatedRef = useRef<string[]>([]);
  const [cropQueue, setCropQueue] = useState<{ src: string; file: File }[]>([]);
  const [cropIndex, setCropIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const currentCropItem = cropQueue[cropIndex] ?? null;

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedArea(croppedPixels);
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - images.length;
    const accepted = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);
    if (accepted.length === 0) return;

    const items = accepted.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));
    accumulatedRef.current = [...images];
    setCropQueue(items);
    setCropIndex(0);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  };

  const handleConfirmCrop = async () => {
    if (!currentCropItem || !croppedArea) return;
    setUploading(true);
    try {
      const blob = await getCroppedBlob(currentCropItem.src, croppedArea);
      const formData = new FormData();
      formData.append("file", blob, currentCropItem.file.name);
      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url: string = res.data?.data?.url;
      if (url) {
        accumulatedRef.current = [...accumulatedRef.current, url];
        onChange(accumulatedRef.current);
      }

      // Advance to next in queue or close
      const nextIndex = cropIndex + 1;
      if (nextIndex < cropQueue.length) {
        setCropIndex(nextIndex);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedArea(null);
      } else {
        setCropQueue([]);
        setCropIndex(0);
      }
    } catch {
      // toast shown via apiClient interceptor
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    const nextIndex = cropIndex + 1;
    if (nextIndex < cropQueue.length) {
      setCropIndex(nextIndex);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedArea(null);
    } else {
      setCropQueue([]);
      setCropIndex(0);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Crop Modal */}
      {currentCropItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-navy-800">
                  Crop Image {cropIndex + 1} of {cropQueue.length}
                </p>
                {aspectLabel && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Aspect ratio: {aspectLabel}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleSkip}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                title="Skip crop"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cropper canvas */}
            <div className="relative bg-gray-900" style={{ height: 320 }}>
              <Cropper
                image={currentCropItem.src}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom */}
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
                <span className="text-xs text-gray-400 w-8 text-right">
                  {zoom.toFixed(1)}×
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSkip}
                className="admin-btn-secondary text-sm"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleConfirmCrop}
                disabled={uploading || !croppedArea}
                className="admin-btn-primary text-sm flex items-center gap-2"
              >
                {uploading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Check size={15} />
                )}
                {uploading ? "Uploading..." : "Crop & Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drop zone / Browse button */}
      {images.length < maxImages && (
        <div
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={openFilePicker}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 transition-colors ${
            dragOver
              ? "border-gold bg-gold/5"
              : "border-gray-200 hover:border-gold/60 hover:bg-gray-50"
          }`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
            <ImagePlus size={22} className="text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-navy-700">
              Click to browse or drag &amp; drop
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              JPG, PNG, WebP · Max 5 MB per file
              {aspectLabel && ` · Will be cropped to ${aspectLabel}`}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-navy-600 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-700 transition-colors"
            onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
          >
            <Upload size={13} />
            Browse Files
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
      />

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, idx) => (
            <div key={url + idx} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <div
                className="relative overflow-hidden"
                style={{ paddingBottom: `${(1 / aspect) * 100}%` }}
              >
                <img
                  src={url}
                  alt={`Image ${idx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                title="Remove"
              >
                <X size={13} />
              </button>
              <div className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-400">
          {images.length} / {maxImages} images added
        </p>
      )}
    </div>
  );
}
