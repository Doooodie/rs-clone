import { useMemo } from 'react';
import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import DriveHeader from './components/DriveHeader';
import DriveList from './components/DriveList';
import { MyFile } from './types/types';
import { useGetAllFilesQuery } from '../../store/api/filesApi';

function Drive() {
  const { data = [] } = useGetAllFilesQuery();
  const { query } = useAppSelector((store) => store.filter);

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
