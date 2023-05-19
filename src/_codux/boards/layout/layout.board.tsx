import { createBoard } from '@wixc3/react-board';
import { Layout } from '../../../components/layout/layout';

export default createBoard({
  name: 'Layout',
  Board: () => <Layout />,
  environmentProps: {
    canvasWidth: 770,
  },
});
