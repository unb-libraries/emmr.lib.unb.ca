const host = 'https://emmr.lib.unb.ca'
describe('Early Modern Maritime Recipes', {baseUrl: host, groups: ['sites']}, () => {

  context('Front page', {baseUrl: host}, () => {
    beforeEach(() => {
      cy.visit('/')
      cy.title()
        .should('contain', 'Early Modern Maritime Recipes')
    })

    specify('Main menu should contain a "Search" link', () => {
      cy.get('#block-mainnavigation a')
        .contains('Search')
        .its('0.href')
        .should('match', /\/search-recipes/)
    });
  })

  context('Recipes search', {baseUrl: `${host}/search-recipes`}, () => {
    beforeEach(() => {
      cy.visit('/')
      cy.title()
        .should('contain', 'Search Recipes')
    })

    specify('Search for keyword "flatulence" should find the "Doses" recipe', () => {
      cy.get('form#views-exposed-form-browse-recipes-v2-page-1').within(() => {
        cy.get('#edit-search-api-fulltext')
          .type('flatulence')
      }).submit()
      cy.get('#browse-recipes-header')
        .should('contain', 'Displaying')
      cy.get('form#views-exposed-form-browse-recipes-v2-page-1 ~ div.views-row span.field-content > a')
        .should('contain', 'Doses')
    });
  })


})
