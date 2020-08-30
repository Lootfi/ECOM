## About ECOM

ECOM is an ecommerce website built using Laravel & React

## TODO List

-   Checkout Address form (DONE)
-   Checkout Payment form (DONE)
-   Checkout Confirm order (DONE)
-   Only active users can order
-   Admin can delete Client Acount (DONE)
-   Admin Confirms orders (DONE)
-   Admin can add coupons (DONE)
-   Admin can manage categories (DONE)
-   Moving logic to services and repositories (DONE, used traits instead of dependency injection)
-   Pagination (DONE)

## HOW TO START

-   git clone https://github.com/Lootfi/ECOM.git --depth=1

-   cd into the project folder:

        cd ECOM\

-   Run your MySQL server

-   Create a database

-   Run this command:

        cp .env.example .env

-   Change the database name and your mysql credentials in the .env file

-   Run the launch.sh file in the command line.

-   In the folder named 'sql', run the sql file into your database

-   Run these commands in separate command line tabs

        php artisan serve

        npm run watch

*   The website should be running now in your default browser!

*   Here are some products in sql format you can import into your database

    https://bit.ly/2K54TW3
    // contains categories, products and their prices.

*   You can add products via a excel file, check the admin dashboard for that

-   Email me for any questions at: abdallahlotfi97@gmail.com, or leave an issue in this repo

-   Please keep in mind that I was a total beginner at both Laravel and React the time I started this mini-project

Thank you
