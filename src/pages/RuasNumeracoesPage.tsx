import React from 'react';
import ImageAnnotator from '../components/ImageAnnotator';

export default function RuasNumeracoesPage(): JSX.Element {
  const handleAddStreet = (point: { x: number; y: number }) => {
    console.log('Street', point);
  };

  const handleAddAddress = (point: { x: number; y: number }) => {
    console.log('Address', point);
  };

  return (
    <div className="p-4">
      <ImageAnnotator
        imageUrl="https://via.placeholder.com/800x600"
        onAddStreet={handleAddStreet}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
}

