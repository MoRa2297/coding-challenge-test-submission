import { act, renderHook } from '@testing-library/react';
import useFormFields from '../useFormFields';

describe('useFormFields', () => {
  const initialState = {
    postCode: '',
    houseNumber: '',
    firstName: '',
    lastName: '',
  };

  it('should initialize with the provided state', () => {
    const { result } = renderHook(() => useFormFields(initialState));
    expect(result.current.fields).toEqual(initialState);
  });

  it('should update a field on onChange', () => {
    const { result } = renderHook(() => useFormFields(initialState));

    act(() => {
      result.current.onChange({
        target: { name: 'postCode', value: '3000' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.fields.postCode).toBe('3000');
  });

  it('should update only the targeted field', () => {
    const { result } = renderHook(() => useFormFields(initialState));

    act(() => {
      result.current.onChange({
        target: { name: 'firstName', value: 'Mario' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.fields.firstName).toBe('Mario');
    expect(result.current.fields.lastName).toBe('');
    expect(result.current.fields.postCode).toBe('');
  });

  it('should clear all fields on clearFields', () => {
    const { result } = renderHook(() => useFormFields(initialState));

    act(() => {
      result.current.onChange({
        target: { name: 'firstName', value: 'Mario' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChange({
        target: { name: 'postCode', value: '3000' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.clearFields();
    });

    expect(result.current.fields).toEqual(initialState);
  });
});
