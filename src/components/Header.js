import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <StyledHeader>
        <div class="navigation-bar">
              <img src="https://assets-global.website-files.com/5cd091cfb5499f22bdf72905/5dcda59e63bb6ae5c9282801_small-red-logo.png" alt="Logo" /> 
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
img {
    width: 200px;
    height: 50px;
}
`

export default Header