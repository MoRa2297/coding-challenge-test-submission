import React, { FunctionComponent } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => {
    return (
        <div className={styles.error} role="alert">
            ⚠️ {message}
        </div>
    );
};

export default ErrorMessage;
