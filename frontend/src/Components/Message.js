// @flow strict
import { Alert } from 'react-bootstrap';

import * as React from 'react';

function Message({variant, children}) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

export default Message;