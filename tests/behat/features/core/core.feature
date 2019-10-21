@api
Feature: Core
  In order to know the website is running
  As a website user
  I need to be able to view the site title and login

  @api
    Scenario: Create users
      Given users:
      | name     | mail            | status |
      | Joe User | joe@example.com | 1      |
      And I am logged in as a user with the "administrator" role
      When I visit "admin/people"
      Then I should see the link "Joe User"

    Scenario: Create a term
      Given I am logged in as a user with the "administrator" role
      When I am viewing a "tags" term with the name "My tag"
      Then I should see the heading "My tag"

    Scenario: Anonymous homepage
      Given I am not logged in
      When I visit "/"
      Then I should see the link "Early Modern Maritime Recipes"
      And I should not see the link "Add Recipe"

    Scenario: Contributor homepage
      Given I am logged in as a user with the "emmr_contributor" role
      When I visit "/"
      Then I should see the link "Early Modern Maritime Recipes"
      And I should see the link "Add Recipe"

    Scenario: Create source
      Given "emmr_source" content:
      | title             | field_source_desc | field_institution     |
      | Test Source       | Test Description  | Dalhousie University  |
      When I visit "/sources"
      Then I should see the link "Test Source"

    Scenario: Create recipe
      Given "emmr_source" content:
      | title             | field_source_desc | field_institution     |
      | Test Source       | Test Description  | Dalhousie University  |
      And "emmr_recipe" content:
      | field_recipe_source | title       | field_recipe_transcription | field_imprecise_date | published |
      | Test Source         | Test Recipe | Test Transcription XYZ     | FALSE                | TRUE      |
      Given I am logged in as a user with the "EMMR Contributor" role
      When I visit "/all-recipes"
      And I wait 180
      And I fill in "Keyword(s)" with "XYZ"
      Then I press "Search"
      Then I should see "Test Recipe"
