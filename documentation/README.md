# Project Documentation: emmr.lib.unb.ca

## Local Development Procedures
A simple ```dockworker start-over``` is enough to spin up a local development instance.

Some quick notes:
* The configured main theme is ```emmr_lib_unb_ca```, and all changes should be made to it. Its location in the repository is ```/themes/custom```.
* The theme ```emmr_lib_unb_ca``` inherits from ```bootstrap4```.
* There is no customization to the admin theme.
* The admin theme is the common the Drupal theme ```seven```.  
* Once deployed locally, any changes to the _themes_ or _assets_ can then be updated with the usual: ```dockworker theme:build-all```

## General Overview
Early Modern Maritime Recipes (EMMR) examines recipes circulating before 1800 in print and manuscript in the area now defined as Canada's Maritime provinces. Early modern recipe writing focused on food and medicine, but recorded a range of other practices associated with alchemy, cosmetics, veterinary, medicine, and laundry, amongst other things. These recipes are texts about knowledge exchange and social networks. They reflect the commercial, social, and familial relationships involved in the acquisition of knowledge, record the use of goods in making products, and connect domestic practices and institutionalized learning. Early Modern Maritime Recipes compiles a record of extant recipes by digitizing and transcribing recipes from archival collections throughout the Maritime provinces.

## Data Overview
EMMR uses Drupal content structures exclusively. These content structures include:
* Basic Page (content type/node) — For static pages.
* Source (content type/node) — Used for recording sources (collections) of recipes.
* Recipe (content type/node) — This is the main data structure in EMMR. Used for recording recipes. Each recipe
references a single source (1-1 relationship).
* Annotation (paragraph type) — Used to store annotations inserted into in recipe text bodys. Since EMMR supports
alternate spellings for annotations, a simpler data structure doesn't suffice. An EMMR annotation contains the annotated text fragment itself (feld_annotation_body), the annotation's descriptive text (field_annotation_text), and 
a list of fragment alternate spellings if required/available (field_alt_spellings). Each recipe can naturally have any 
arbitrary number of annotations, as required (1-N relationship).
* Contributor (paragraph type) — Contains a recipe's contributor (field_contributor_name), as well as the role of that 
contributor in the recipe (field_contributor_role: author, editor, etc). A recipe can reference any arbitrary number of 
contributors (1-N relationship).
* EMMR Contributor Roles (taxonomy) — Controlled vocabulary to store contributor roles (author, editor, etc).
* EMMR Publication Formats (taxonomy) — Controlled vocabulary to store recipe material formats (manuscript, microfilm, etc).
* EMMR Recipe Types (taxonomy) — Controlled vocabulary to store recipe types (drink, food, medicine, cosmetic, etc).
* EMMR Source Institutions (taxonomy) — Controlled vocabulary to store institutions associated with recipe sources 
(Dalhousie University, UNB, Nova Scotia Archives, etc).

## Module Overview
* emmr_ckeditor_insert: Main part of the marginalia (annotation) set of utilities for EMMR. This module provides a 
CKEditor plugin for inserting annotations to recipe text bodies in EMMR. 
* emmr_ckeditor_replace: Part of the marginalia (annotation) set of utilities for EMMR. This module provides a 
CKEditor plugin for replacing annotations in recipe text bodies in EMMR. 
* emmr_ckeditor_undo: Part of the marginalia (annotation) set of utilities for EMMR. This module provides a 
CKEditor plugin for undoing annotation changes in recipe text bodies in EMMR. 
* emmr_util: Provides utility scripts for maintenance tasks. E.g. refresh_recipes.php updates all recipes in the Drupal database, triggering new or updated data update hooks.
* instance_initial_content: Contains the initial site data migration, originally from an older version of the site.
* emmr_core: Contais all custom functionality extending Drupal capabilities. All hooks pertainig to data behaviour during ingestion and storage, as well as what data is available for display, should be found in the .module file here.
