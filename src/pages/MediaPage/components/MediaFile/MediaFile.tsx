import React, { FC, MouseEvent } from 'react';
import { Icon, Tooltip } from 'ui-kit';
import { useMediaInfoStore } from 'pages/MediaPage/MediaInfo';
import { useModalsStore } from 'store/useModalsStore';
import './MediaFile.scss';

interface IMediaFile {
  name: string;
  showDocViewer: () => void;
}

export const MediaFile: FC<IMediaFile> = (props) => {
  const { name, showDocViewer } = props;
  const titleKey = useMediaInfoStore((state) => state.titleKey);
  const removeFile = useMediaInfoStore((state) => state.removeMediaFile);

  const getFileExtension = (file: string) => {
    const string = file.split('.');
    return string[string.length - 1];
  };

  const getFileName = (file: string) => {
    return file.replace(`${titleKey}`, '');
  };

  const renderTooltipContent = (title: string) => {
    return <span>{title}</span>;
  };

  const onRemoveFile = (e: MouseEvent<HTMLDivElement>, key: string) => {
    e.stopPropagation();
    removeFile(key);
  };

  return (
    <div
      className='MediaFile'
      onClick={showDocViewer}
      // onContextMenu={(e) => onShowModalRemove(e, name)}
    >
      <div className='IconBlock'>
        <div className='IconBlock__Title'>{getFileExtension(name)}</div>
        <div className='IconBlock__Wrapper'>
          <Icon type={'File'} />
        </div>
      </div>
      <Tooltip
        content={renderTooltipContent(getFileName(name))}
        placement='top'
      >
        <span className='Title'>{getFileName(name)}</span>
      </Tooltip>
      <div className='IconDelete' onClick={(e) => onRemoveFile(e, name)}>
        <Icon type={'MediaDeleteFile'} />
      </div>
    </div>
  );
};
