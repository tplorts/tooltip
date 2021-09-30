import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { didScroll } from './scrolling';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
//eric@openspace.ai
const Tooltip = styled.div`
  background-color: #ddd;
  padding: 0.5rem;
  border: 1px solid #aaa;
  position: fixed;
  border-radius: 6px;
`;

interface Props {
  title: string;
}

const SPACE_FROM_ANCHOR = 16;

const TooltipWrapper: React.FC<Props> = ({ title, children }) => {
  const wrapperRef = useRef<HTMLElement>();
  const [show, setShow] = useState(false);
  const [xPosition, setXPosition] = useState(0);

  const reveal = () => {
    const wrapperEl = wrapperRef.current;
    if (wrapperEl != null) {
      const rect = wrapperEl.getBoundingClientRect();
      setXPosition(rect.right + SPACE_FROM_ANCHOR);
      setShow(true);
    }
  };

  const hide = useCallback(() => setShow(false), []);

  useEffect(() => {
    const subscription = didScroll.subscribe(() => {
      hide();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [hide]);

  return (
    <Wrapper
      onMouseEnter={reveal}
      onMouseLeave={hide}
      // @ts-expect-error (sorry, did not figure out why TS does like the type agreement here)
      ref={wrapperRef}
    >
      {children}
      {show && <Tooltip style={{ left: xPosition }}>{title}</Tooltip>}
    </Wrapper>
  );
};

export default TooltipWrapper;
