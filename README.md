# Project Details

Project name: Moquette

Project description: Front end application that supports loading, viewing, and searching an inputted CSV file.

Team members:

Jinho Lee (jlee812) - estimated time spent: 10 hours

Jennifer Liao (jzliao) - estimated time spent: 10 hours

Repo Link: https://github.com/cs0320-s24/mock-jennliao-jinholee17

# Design Choices

Function Library:
In order to run different commands on our web app, we keep a running list of functions. To handle calls, all functions in the file are stored as variables in a larger useFunctionLibrary() function. useFunctionLibrary() returns a map storing each of the function objects, so they can be accessed and called in REPLHistory by passing the first argument of user input into the map. From there, we can call the function object and pass in the rest of the user input as arguments. Additionally, each function object implements the REPLFunction interface specified to us in user story 6, so each function in our library takes in an array of strings as an argument and returns either a string or a 2d array of strings.

Currently, our supported functions are: mode, load, view, and search, but a future developer could easily add an additional function by navigating to the functions.ts file, writing the function as a constant (and making sure it implements REPLFunction), and returning it at the end. The new function should now be integrated into the program and no other code needs to be changed.

Mocked Data
In order to create front end functionality for this site without connecting it to a real backend and datasource, we used mock data to simulate what the results from the backend could look like. To do this, we stored all of our mock datasets and mock search results as constants in mocked-data.ts and exported them. Then, in our function library, we have two hashmaps: one that maps from string filenames to their corresponding datasets and one that maps string search queries to their corresponding datasets. Our view and search functions use these maps in order to display the “correct” data given user input. This way, we are able to ensure that our frontend will be able to handle datasets produced by different user inputs once we connect it to the backend.

# Errors/Bugs

n/a

# Tests

We broke our tests up into four files: one that tests mode, one that tests load/view, one that tests search, and one that tests interactions between load, view, and search.

For mode, we tested both successful and unsuccessful calls. We tested mode with too many arguments, then tested it with successful and unsuccessful calls to load, view, and search. To test brief, we made sure that the input command was not visible, and to test mode, we made sure that it was.

For load and view, we similarly tested them with too many arguments, “bad” calls, and successful ones. We tested load with an incorrect file parameter and invalid header parameters. We tested view with no file loaded. We tested both with an empty csv file.

For search, we tested a variety of situations:

- Too many / too little parameters
- No file loaded
- Non existent data (search term doesn’t map to anything)
- Successful search
- Searching with column number identifiers
- Searching with header name identifiers
- Searching with a space in the search term

For our interactions suite, we tested calling one function, then another, and looking at the output. We tested:

- Loading, viewing, loading again, and viewing again to see if the data was updated
- A good load, a bad load, and viewing
- Searching after a good load and a bad load
- Loading and viewing a load with and without headers
- Viewing and searching before and after changing mode

We also tested what we called “general” tests here: ones that didn’t involve the functions. These included testing that the input box was only accessible after logging in, testing inputting no text, and checking that login clears the history.

# How to

To run, enter npm start in the terminal. This will start the server and print a link that you can open in your internet browser.

To input commands, you must login by clicking on the Login button. After this, you will see a input box and a Submit button where you can call commands.

Type load \<filename\> \<header\> to load a file. The header parameter should either be “true” or “false” and indicates if the file you are loading has a header or not.

Type view to view your loaded file as a table.

Type search \<identifier\> \<searchTerm\> to search your loaded file. Identifier is either an integer referring the the column index or a string referring to the header name. The search term parameter should be the term you are looking for.

Type mode to change the mode from what it currently is set as. The possible modes are either brief or verbose - brief mode will display the output of the command, but verbose mode will also display your input.

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_

We used code from the Mock gear up to set up our project.
