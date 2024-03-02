import styled from '@emotion/styled'
import React from 'react'

export const formatPrices=
(amount: number)=>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
} ;
