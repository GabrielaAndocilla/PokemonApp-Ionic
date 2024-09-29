import { Children, ReactElement } from 'react';

export const Show = (props: any): ReactElement | null => {
  let when: ReactElement | ReactElement[] | null = null;
  let otherwise: ReactElement | ReactElement[] | null = null;
  Children.forEach(props.children, (children) => {
    if (children.props.isTrue === undefined) return (otherwise = children);
    if (!when && children.props.isTrue) return (when = children);
  });
  return when || otherwise;
};

Show.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: ReactElement;
}) => (isTrue ? children : <></>);
Show.Else = ({ children }: { children: ReactElement }) => children;
