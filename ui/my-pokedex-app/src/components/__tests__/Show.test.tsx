import { render } from '@testing-library/react';
import { Show } from '../Show';

describe('Menu Component', () => {
  it('should render component correctly - with existing routes', async () => {
    const flag = true;
    const { getAllByText, queryByText } = render(
      <Show>
        <Show.When isTrue={flag}>
          <p>It will show</p>
        </Show.When>
        <Show.Else>
          <p>It will not show</p>
        </Show.Else>
      </Show>
    );
    expect(getAllByText('It will show')).toBeDefined();
    expect(queryByText('It will not show')).toBeNull();
  });
});
