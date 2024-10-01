import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ItemListForm from '../ItemListForm';

describe('Item List Component', () => {
  it('should render component correctly', async () => {
    const items = ['1', '2', '3'];
    render(
      <ItemListForm label={'Test List Form'} items={items} setItems={vi.fn()} />
    );
    expect(screen.findByText('Test List Form')).toBeDefined();
    expect(screen.findByText('1')).toBeDefined();
    expect(screen.findByText('2')).toBeDefined();
    expect(screen.findByText('3')).toBeDefined();
  });
});
