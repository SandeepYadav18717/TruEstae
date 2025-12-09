The user enters a given keyword  (for example: “organic”).

The frontend sends this keyword to the backend using an API request.

The backend compares the keyword with the Tags column of each row.
Applying the Search Filter

The search condition is applied only if the user has actually 
The backend checks if the user entered a tag to search.

It loops through every row of the data.

Only the rows for which match_tags() returns True are kept.

If the keyword is found inside the Tags text and  the row is kept.

Rows that do not contain the keyword are removed.

The final filtered records are returned to the frontend