import React from 'react'
import styled from 'styled-components'

function Footer () {
    return (
        <StyledHeader>
        <h2>Lambda Eats</h2>
        </StyledHeader>
    )
}

const StyledHeader = styled.header `
h2 {
    color: maroon;
    text-align: center;
}
`
export default Footer