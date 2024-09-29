import { throttle } from 'lodash';
import { FC, cloneElement, useMemo, useState } from 'react';
import { useElementSize } from '../hooks/useElementSize';

export interface WindowProps {
  rowHeight: number;
  children: Array<JSX.Element>;
  gap?: number;
}
const bufferedItems = 2;
const VirtualizedList: FC<WindowProps> = ({
  rowHeight,
  children,
  gap = 10,
}) => {
  const [containerRef, { height }] = useElementSize<HTMLUListElement>();
  const [scrollPosition, setScrollPosition] = useState(0);

  const visibleChildren = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + height) / rowHeight - 1) + bufferedItems,
      children.length - 1
    );
    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      cloneElement(child, {
        style: {
          position: 'absolute',
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          left: 0,
          right: 0,
          lineHeight: `${rowHeight}px`,
        },
      })
    );
  }, [children, height, rowHeight, scrollPosition, gap]);

  const onScroll = useMemo(
    () =>
      throttle(
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
        },
        50,
        { leading: false }
      ),
    []
  );

  return (
    <ul
      onScroll={onScroll}
      style={{
        overflowY: 'scroll',
        position: 'relative',
        height: '200px',
      }}
      ref={containerRef}
    >
      {visibleChildren}
    </ul>
  );
};
export default VirtualizedList;
