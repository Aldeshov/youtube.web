import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContentItem from '../../components/ContentItem/ContentItem';
import VideoContentListContext from '../../contexts/VideoContentListContext';

import VideoContent from '../../models/VideoContent'
import StoreState from '../../models/StoreState';
import { API_URL } from '../../tools/Config'
import { APIRequest } from '../../tools/API'

import './ContentList.css';
import DefaultState from '../../models/DefaultState';

const ContentList = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [videoContents, setVideoContents] = useState<VideoContent[]>([]);
  const currentIndexState = useMemo(() => ({
    currentIndex,
    setCurrentIndex
  }), [currentIndex]);

  const defState = (useSelector(store => store) as any).defaultStore;
  const tokenState = (useSelector(store => store) as any).tokenStore;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'LOADING', payload: null });
    setVideoContents([])

    APIRequest<VideoContent[]>(`${API_URL}/app/contents`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${tokenState}`
      },
      method: 'GET'
    })
      .then(videoContents => {
        dispatch({ type: 'LOADED', payload: "Video content list" });
        setVideoContents(videoContents);
      })
      .catch((error: Error) => {
        dispatch({ type: 'ERROR', payload: error.message });
      })
  }, []);

  return (
    <VideoContentListContext.Provider value={currentIndexState}>
      <main style={{ paddingTop: 75 }}>
        {
          (defState as DefaultState).status === StoreState.LOADED_SUCCESSFULLY &&
          videoContents.map((item: VideoContent, index: number) => (
            <ContentItem key={index} videoContent={item} index={index} />
          ))
        }
      </main>
    </VideoContentListContext.Provider>
  );
}

export default ContentList;
