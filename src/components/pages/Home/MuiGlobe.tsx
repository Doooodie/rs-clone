import { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Stack, useTheme, useMediaQuery } from '@mui/material';

import earthLight from '../../../assets/images/earth-light.jpg';
import earthDark from '../../../assets/images/earth-dark.jpg';

const arcsData = [...Array(10).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: '#2196f3',
}));

function MuiGlobe() {
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const XL = useMediaQuery(theme.breakpoints.up('lg'));
  const LG = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const MD = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const SM = useMediaQuery(theme.breakpoints.down('sm'));
  let size = 0;

  if (XL) size = 500;
  if (LG) size = 400;
  if (MD) size = 300;
  if (SM) size = 200;

  const globeEl = useRef<GlobeMethods>();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.camera().zoom = 1.2;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;
      globeEl.current.controls().minPolarAngle = Math.PI / 2;
      globeEl.current.controls().maxPolarAngle = Math.PI / 2;
    }
  }, []);

  return (
    <Stack alignItems='center'>
      <Globe
        ref={globeEl}
        width={size}
        height={size}
        backgroundColor='#00000000'
        globeImageUrl={isLightTheme ? earthLight : earthDark}
        arcsData={arcsData}
        arcColor={() => theme.palette.primary.main}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => 2000}
      />
    </Stack>
  );
}

export default MuiGlobe;
