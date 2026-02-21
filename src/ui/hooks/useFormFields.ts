import React from "react";

type FormFields = Record<string, string>;

export default function useFormFields<T extends FormFields>(initialState: T) {
    const [fields, setFields] = React.useState<T>(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const clearFields = () => {
        setFields(initialState);
    };

    return { fields, onChange, clearFields };
}
