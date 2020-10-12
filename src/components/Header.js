import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <StyledHeader>
        <div class="navigation-bar">
              <img src="LambdaEatsLogo.jpg" alt="Logo" /> 
            <div class="navbar">
                <a href="index.html">Order</a>
                <a href="index.html">Home</a>
            </div>
        </div>
        </StyledHeader>

    )
}

const StyledHeader = styled.header `
.navigation-bar {
    color: red;
}
a {
    float: right;
    justify-content: space-between;
}
`

export default Header