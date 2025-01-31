About the project
The projects purpose is to make use of an API (any open API will do) in order to get aquainted with this way of collecting data from the web. The project also incorporates CRUD (Create, Read, Update and Delete) operations in order to maintain the information up to date. The information retrieved with fetch is transformed locally (according to my needs) and saved for later use in a "localStorage construct" (sort of a browser built-in safe box). It is this "localStorage" that one can perform the above mentioned CRUD operations upon. 
The used API is called OMDb (Open Movie Database) and can be found here https://www.omdbapi.com/
-----------------------------------------------
How to run the project:
You will need an API-key in order to run the project. You can get it here https://www.omdbapi.com/apikey.aspx
Choose thge FREE option and validate the e-mail received to activate it.
Copy and paste your activation key in the javaScript file called omdb-api.js, in the top of the scrit, at this line:
const ACCESS_KEY = "YOUR KEY GOES HERE";

-----------------------------------------------
There are two menu options:
1. The first mennu option is "Search movies". There you can perform a search using (parts of) a movie title. If any movies are found, you can click the "Add to favorites" button, under each movie poster, to add the title to your favorite movies list.

2. The second option, "Your favorites", lets you delete one movie or update the information about a particular movie (not implemeted yet). There is also a special button ("Clear the list") that deletes all the movies from the list.

3. (NOT IMPLEMENTED YET) Here, you will be able to edit a movie and add relevant information, such as:
- a rating
- actors
- movie prizes (if any)

Note: The application is built for desktop size and does not include responsiveness required for smaller displays. 