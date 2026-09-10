import React from 'react';
import { DocRenderer } from 'react-doc-viewer';

// todo не нужно потому что не выводит pdf

export const MyCustomPNGRenderer: DocRenderer = ({
  mainState: { currentDocument },
}) => {
  if (!currentDocument) return null;
  return (
    <div id='my-png-renderer'>
      <img id='png-img' src={currentDocument.fileData as string} />
    </div>
  );
};

MyCustomPNGRenderer.fileTypes = [
  'png',
  'image/png',
  'image/jpeg',
  'application/pdf',
  'text/plain',
];
MyCustomPNGRenderer.weight = 1;
