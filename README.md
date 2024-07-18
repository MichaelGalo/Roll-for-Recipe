# Roll-for-Recipe

## Problem Solved

My wife loves to cook and try new recipes; however, she really dislikes having to choose a menu each week before going to the grocery store and writing down all of her ingredient-needs. I want to create a repository for all her recipes to be stored, updated and/or deleted while giving her the opportunity to randomize our menu for the week.

Roll-for-Recipe will allow a user to create, read, update and delete recipes while also giving the functionality to pick however many recipes a user thinks they'll need to cook that week. It will take from your saved recipes and generate random options to thumb through. In addition (with stretch goals) it will automatically create a shopping list that can be utilized while grocery shopping.

My aim is for this app to fix the time-gap between deciding on what to shop for and actually going to the grocery store with a dedicated list. It's created to give back some free time to busy people who like to cook and shop strategically.

## Project MVP: User Stories & Acceptance Criteria

### Unauthorized User

1. **Create an account**
   - Given the unauthorized user wants to access the application
   - When the unauthorized user loads the site initially, clicks on the "create account" and enters in log-in info (name & password)
   - Then the page will automatically redirect to the enter profile details page, then after that save to the home splash page

### Authorized User

1. **Log in**

   - Given the authorized user wants to access the application
   - When the authorized user loads the site initially and enters in log-in info (name & password)
   - Then the page will automatically redirect to the home splash page

2. **View profile details**

   - Given the user wants to see their profile details
   - When the user clicks on the profile button on the nav bar
   - Then the page navigates to the profile details page

3. **Edit profile details**

   - Given the user wants to initially enter after account creation or edit profile details
   - When the user initially access the application from create user or clicking profile button in nav bar
   - Then the edit profile details page will render

4. **Create a new recipe**

   - Given the user wants to create a new recipe
   - When the user clicks on the new recipe button in the navbar
   - Then the page will redirect them to enter in new recipe details. After saving it will redirect to all recipes

5. **View all recipes**

   - Given the user wants to see all recipes
   - When the user clicks on the all-recipes on the nav bar
   - Then the all recipes page will render

6. **View recipe details**

   - Given the user wants to read a previously entered recipe
   - When the user clicks on the title of a recipe in the all-recipes page
   - Then the corresponding recipe details page will render

7. **Update recipe details**

   - Given the user wants to edit details of a previously entered recipe
   - When the user clicks the edit button on the recipe details page & updates the details in the newly rendered page
   - Then the recipe details page will render with the newly updated details reflected

8. **Delete a recipe**

   - Given the user wants to delete a recipe
   - When the user clicks on the delete button on the edit details page
   - Then recipe will be deleted, redirecting them to the all recipes page

9. **Log out**

   - Given the user wants to log out
   - When the user clicks on the log out button on the nav bar
   - Then the page will navigate to the enter details page

10. **Roll for recipe**
    - Given the user wants to generate a random set of recipes
    - When the user clicks on the Let's Roll! button on the nav bar
    - Then the roll-for-recipe page will render, allowing them enter how many to generate from their list of recipes

## Stretch Goals: User Stories & Acceptance Criteria

1. **Navigate to home page**

   - Given the user wants to navigate to the home page
   - When the user clicks on the logo in the nav bar
   - Then the page will navigate back to the home splash page

2. **Filter recipes by cooking time**

   - Given the user wants to filter recipes by time
   - When the user presses the filter dropdown select on all their all recipes page
   - Then only show results for recipes that match the time

3. **Filter recipes by keyword**

   - Given the user wants to filter recipes
   - When the user types keywords into the search bar on their all recipes page
   - Then only show results for recipes that match those keywords

4. **Favorite a recipe**

   - Given the user wants to favorite recipe
   - When the user presses a favorite button on all the all recipes page
   - Then favorite button will change colors & recipe will be added to the favorites page

5. **View favorite recipes**

   - Given the user wants to see their favorite recipes
   - When the user clicks on the favorites button on the nav bar
   - Then the favorites page will render

6. **Generate a shopping list**

   - Given the user wants to roll for recipes & selects a recipe to keep
   - When the user presses a shop! button on a recipe generated from roll-a-recipe page
   - Then the shopping list page will render all of the ingredients for the recipe in the shopping queue

7. **View shopping list**

   - Given the user wants to see their recipes currently shopping for
   - When the user presses a the shopping list button on the nav bar
   - Then shopping list page will render with ingredients displayed by sub-category with quantities displayed

8. **Mark off items from shopping list**

   - Given the user wants to use the application while grocery shopping to reduce ingredients
   - When the user presses a radio button connected to a given ingredient
   - Then the ingredient will disappear from the DOM

9. **Edit password**
   - Given the user wants to edit password
   - When the user presses an edit password text in the profile details page
   - Then the edit password page will appear
