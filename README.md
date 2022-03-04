# book_collector

Project created as an exercise for a Job interview.

Installation:  
* Make sure you have [MongoDB](https://www.mongodb.com/) installed, with default configuration
* Clone this repo
* Install npm packages with `npm i`
* Spin up the project with `npm run start`
* The project should now be running on http://localhost:8080

## Some notes:
* I chose to move the delete button away from the form, and into the book entry. I feel it makes the page a little more intuitive.
* AFAIK the concurrently npm package I use to spin up the web server and REST, should not cause a race condition on boot, but I am not 100% on this. It has not been an issue, even if it does, as vue build process takes considerably longer.