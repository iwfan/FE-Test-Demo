describe('App E2E', () => {
    it('e2e', () => {
        cy.visit('/');

        cy.get('.search')
            .type('红豆')
        // .should('have.value', '王维');

        cy.get('.suggestions')
            .first()
            .should('contain', '红豆')

    });
});
