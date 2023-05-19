import { createBoard } from '@wixc3/react-board';
import { Gifo } from '../../../components/gifo/gifo';

export default createBoard({
  name: 'Gifo',
  Board: () => <Gifo />,
  environmentProps: {
    canvasWidth: 258,
    canvasHeight: 244,
  },
});
