import React from 'react';

import transformAddress, { RawAddressModel } from '../../core/models/address';
import { Address } from '@/types';
import useAddressBook from './useAddressBook';
import useFormFields from './useFormFields';

export default function useAddressForm() {
  const { fields, onChange, clearFields } = useFormFields({
    postCode: '',
    houseNumber: '',
    firstName: '',
    lastName: '',
  });

  const { postCode, houseNumber, firstName, lastName } = fields;

  const [error, setError] = React.useState<string | undefined>(undefined);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { addAddress } = useAddressBook();

  const handleSelectedAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setSelectedAddress('');
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      const res = await fetch(
        `${baseUrl}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.errormessage || 'Something went wrong');
        return;
      }

      const found: Address[] = data.details.map((address: RawAddressModel) =>
        transformAddress(address),
      );

      setAddresses(found);
    } catch (err) {
      setError('Failed to fetch addresses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError('First name and last name fields mandatory!');
      return;
    }

    if (!selectedAddress || !addresses.length) {
      setError("No address selected, try to select an address or find one if you haven't");
      return;
    }

    const foundAddress = addresses.find((address) => address.id === selectedAddress);

    if (!foundAddress) {
      setError('Selected address not found');
      return;
    }

    setError(undefined);
    addAddress({ ...foundAddress, firstName, lastName });
  };

  const handleClearAll = () => {
    clearFields();
    setAddresses([]);
    setSelectedAddress('');
    setError(undefined);
  };

  return {
    fields,
    onChange,
    addresses,
    selectedAddress,
    error,
    loading,
    handleSelectedAddressChange,
    handleAddressSubmit,
    handlePersonSubmit,
    handleClearAll,
  };
}
