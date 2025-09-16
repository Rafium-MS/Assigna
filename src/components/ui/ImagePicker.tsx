import React from 'react';
import { Button } from './Button';

interface ImagePickerProps {
  value?: string;
  onChange: (dataUrl?: string) => void;
  compress?: boolean;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ value, onChange, compress }) => {
  const handleFile = async (file?: File) => {
    if (!file) {
      onChange(undefined);
      return;
    }

    if (compress) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      await new Promise((res) => (img.onload = res));
      const canvas = document.createElement('canvas');
      const max = 600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      onChange(canvas.toDataURL('image/jpeg', 0.8));
    } else {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <img src={value} alt="preview" className="w-16 h-16 object-cover rounded-lg border" />
      ) : (
        <div className="w-16 h-16 rounded-lg border grid place-items-center text-xs text-neutral-500">sem imagem</div>
      )}
      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
        {value && (
          <Button onClick={() => onChange(undefined)} className="bg-neutral-100 dark:bg-neutral-800">
            Remover
          </Button>
        )}
      </div>
    </div>
  );
};
