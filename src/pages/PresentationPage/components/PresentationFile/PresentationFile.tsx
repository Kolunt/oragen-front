import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { usePresentationStore } from 'pages';
import './PresentationFile.scss';

interface IDocs {
  uri: string;
}

export const PresentationFile = () => {
  const url = usePresentationStore((state) => state.links);
  const getFileUrl = usePresentationStore((state) => state.getLinks);
  const [docs, setDocs] = useState<IDocs[]>([]);

  useEffect(() => {
    getFileUrl();
  }, []);

  useEffect(() => {
    setDocs(
      url.map((item) => {
        return { uri: Object.values(item)[0] };
      })
    );
  }, [url]);

  const openDoc = (link: string) => {
    setDocs([{ uri: link }]);
  };
  return (
    <div className='PresentationFile'>
      <div className='flex hidden h-full'>
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
        <div>
          {url?.map((item) => (
            <div
              key={Object.keys(item)[0]}
              className='mb-10 ml-10 pointer'
              onClick={() => openDoc(Object.values(item)[0])}
            >
              {Object.keys(item)[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
