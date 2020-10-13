  
/* eslint-disable no-undef */
describe('test our form inputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })
    it('add texts to inputs and submit form', () => {
        cy.get('[data-cy=name]').type('Mark Hillin').should('have.value', 'Mark Hillin');
        cy.get('[data-cy=email]').type('mark.hillin@gmail.com').should('have.value', 'mark.hillin@gmail.com');
        cy.get('[data-cy=submit]').click();
    });
});