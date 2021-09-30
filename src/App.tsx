import styled from 'styled-components';
import { didScroll } from './scrolling';
import Tooltip from './Tooltip';

const Root = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  height: 16rem;
  padding: 2rem;
  border: 1px solid #aaa;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`;

const Anchor = styled.div`
  background-color: #eee;
  padding: 0.5rem 1rem;
`;

const words = 'Ensure your Tooltip is not cut off'.split(' ');

function App() {
  return (
    <Root>
      <ScrollView onScroll={() => didScroll.next()}>
        <ScrollContent>
          {words.map((word) => (
            <Tooltip title={word} key={word}>
              <Anchor>
                <h3>{word.slice(0, 2)}</h3>
              </Anchor>
            </Tooltip>
          ))}
        </ScrollContent>
      </ScrollView>
    </Root>
  );
}

export default App;
