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
      And I wait 30
      Then I should see the link "Test Source"
