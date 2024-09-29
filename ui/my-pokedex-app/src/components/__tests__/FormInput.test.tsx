import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormInput } from '../FormInput';

describe('Form Input Component', () => {
  it('calls onChangeAction when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Username"
        value=""
        onChangeAction={handleChange}
        type="text"
        placeholder="Enter your username"
      />
    );

    const input = screen.getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;

    fireEvent.input(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledWith('new value');
  });
});
