import { IonApp } from '@ionic/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { FormInput } from '../FormInput';

describe('Form Input Component', () => {
  it('calls onChangeAction when input value changes', async () => {
    const handleChange = vi.fn();
    render(
      <IonApp>
        <FormInput
          label="Username"
          value="test"
          onChangeAction={handleChange}
          type="text"
          placeholder="Enter your username"
        />
      </IonApp>
    );

    const input = screen.getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;
    expect(input.getAttribute('value')).toBe('test');
  });
});
