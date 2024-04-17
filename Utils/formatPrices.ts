import React from 'react';
import styled from '@emotion/styled';

export const formatPrices = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};
