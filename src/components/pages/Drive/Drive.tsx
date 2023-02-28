import { useMemo, useEffect } from 'react';
import { Container } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import DriveHeader from './components/DriveHeader';
import DriveList from './components/DriveList';
import { MyFile } from './types/types';
import { useGetAllFilesQuery } from '../../store/api/filesApi';
import { useGetTokenQuery } from '../../store/api/authApi';
import { updateToken } from '../../store/slices/authSlice';

function Drive() {
  const dispatch = useAppDispatch();
  const { data = [] } = useGetAllFilesQuery();
  const { data: tokenData } = useGetTokenQuery();

  const { query } = useAppSelector((store) => store.filter);

  useEffect(() => {
    if (tokenData && tokenData.token) dispatch(updateToken(tokenData.token));
  }, [dispatch, tokenData]);

  function filteredByQuery(value: string, array: MyFile[]) {
    if (value.length > 0) {
      return [
        ...array.filter((item) => item.name.toLocaleUpperCase().includes(value.toUpperCase())),
      ];
    }
    return [...array];
  }

  const filteredFiles = useMemo(() => filteredByQuery(query, data), [data, query]);

  return (
    <Container
      component='main'
      maxWidth='xl'
      sx={{ my: 2, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 220px)' }}
    >
      <DriveHeader />
      <DriveList files={filteredFiles} />
    </Container>
  );
}

export default Drive;
