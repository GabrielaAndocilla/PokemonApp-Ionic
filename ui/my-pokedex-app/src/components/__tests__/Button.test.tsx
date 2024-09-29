import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from '../Button';

describe('Button Component', () => {
  it('should render component correctly', async () => {
    const clickFunction = vi.fn();
    const { getByText } = render(
      <Button variant={'primary'} onClickAction={clickFunction}>
        Button Content
      </Button>
    );
    await userEvent.click(getByText('Button Content'));
    expect(clickFunction).toHaveBeenCalled();
  });
});
