import { createBoard } from '@wixc3/react-board';
import { Footer } from '../../../components/footer/footer';

export default createBoard({
  name: 'Footer',
  Board: () => <Footer />,
  environmentProps: {
    canvasWidth: 1074,
    canvasHeight: 34,
    windowWidth: 414,
    windowHeight: 896,
  },
});
