import { useScrollTrigger, Fade, Box } from '@mui/material';
import { animateScroll } from 'react-scroll';

interface Props {
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Fade in={trigger}>
      <Box
        onClick={() => animateScroll.scrollToTop()}
        role='presentation'
        sx={{ position: 'fixed', bottom: 90, right: 50 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default ScrollTop;
