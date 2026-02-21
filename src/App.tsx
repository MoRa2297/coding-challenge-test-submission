import React from 'react';

import Address from '@/components/Address/Address';
import AddressBook from '@/components/AddressBook/AddressBook';
import Button from '@/components/Button/Button';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Form from '@/components/Form/Form';
import Radio from '@/components/Radio/Radio';
import Section from '@/components/Section/Section';
import useAddressForm from '@/hooks/useAddressForm';

function App() {
  const {
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
  } = useAddressForm();

  const { postCode, houseNumber, firstName, lastName } = fields;

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>Enter an address by postcode add personal info and done! 👏</small>
        </h1>

        <Form
          label="🏠 Find an address"
          loading={loading}
          submitText="Find"
          onFormSubmit={handleAddressSubmit}
          formEntries={[
            {
              name: 'postCode',
              placeholder: 'Post Code',
              extraProps: { value: postCode, onChange },
            },
            {
              name: 'houseNumber',
              placeholder: 'House number',
              extraProps: { value: houseNumber, onChange },
            },
          ]}
        />

        {addresses.map((address) => (
          <Radio
            name="selectedAddress"
            id={address.id}
            key={address.id}
            onChange={handleSelectedAddressChange}
          >
            <Address {...address} />
          </Radio>
        ))}

        {selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            loading={false}
            submitText="Add to addressbook"
            onFormSubmit={handlePersonSubmit}
            formEntries={[
              {
                name: 'firstName',
                placeholder: 'First name',
                extraProps: { value: firstName, onChange },
              },
              {
                name: 'lastName',
                placeholder: 'Last name',
                extraProps: { value: lastName, onChange },
              },
            ]}
          />
        )}

        {error && <ErrorMessage message={error} />}

        <Button variant="secondary" onClick={handleClearAll}>
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
