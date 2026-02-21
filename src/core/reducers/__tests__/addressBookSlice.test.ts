import reducer, { addAddress, removeAddress, updateAddresses } from '../addressBookSlice';
import { Address } from '@/types';

const mockAddress: Address = {
  id: '1234-1-0',
  city: 'Melbourne',
  firstName: 'Mario',
  lastName: 'Rossi',
  houseNumber: '1',
  postcode: '3000',
  street: 'Elizabeth Street',
};

const mockAddress2: Address = {
  id: '2000-2-1',
  city: 'Sydney',
  firstName: 'Luigi',
  lastName: 'Bianchi',
  houseNumber: '2',
  postcode: '2000',
  street: 'George Street',
};

describe('addressBookSlice', () => {
  const initialState = { addresses: [] };

  describe('addAddress', () => {
    it('should add an address to the store', () => {
      const state = reducer(initialState, addAddress(mockAddress));
      expect(state.addresses).toHaveLength(1);
      expect(state.addresses[0]).toEqual(mockAddress);
    });

    it('should not add a duplicate address', () => {
      const stateWithOne = reducer(initialState, addAddress(mockAddress));
      const stateWithDuplicate = reducer(stateWithOne, addAddress(mockAddress));
      expect(stateWithDuplicate.addresses).toHaveLength(1);
    });

    it('should add multiple different addresses', () => {
      const state = [mockAddress, mockAddress2].reduce(
        (s, a) => reducer(s, addAddress(a)),
        initialState,
      );
      expect(state.addresses).toHaveLength(2);
    });
  });

  describe('removeAddress', () => {
    it('should remove an address by id', () => {
      const stateWithOne = reducer(initialState, addAddress(mockAddress));
      const state = reducer(stateWithOne, removeAddress(mockAddress.id));
      expect(state.addresses).toHaveLength(0);
    });

    it('should only remove the correct address', () => {
      const stateWithTwo = [mockAddress, mockAddress2].reduce(
        (s, a) => reducer(s, addAddress(a)),
        initialState,
      );
      const state = reducer(stateWithTwo, removeAddress(mockAddress.id));
      expect(state.addresses).toHaveLength(1);
      expect(state.addresses[0].id).toBe(mockAddress2.id);
    });

    it('should do nothing if id does not exist', () => {
      const stateWithOne = reducer(initialState, addAddress(mockAddress));
      const state = reducer(stateWithOne, removeAddress('non-existent-id'));
      expect(state.addresses).toHaveLength(1);
    });
  });

  describe('updateAddresses', () => {
    it('should replace all addresses', () => {
      const stateWithOne = reducer(initialState, addAddress(mockAddress));
      const state = reducer(stateWithOne, updateAddresses([mockAddress2]));
      expect(state.addresses).toHaveLength(1);
      expect(state.addresses[0].id).toBe(mockAddress2.id);
    });

    it('should clear all addresses when given empty array', () => {
      const stateWithOne = reducer(initialState, addAddress(mockAddress));
      const state = reducer(stateWithOne, updateAddresses([]));
      expect(state.addresses).toHaveLength(0);
    });
  });
});
