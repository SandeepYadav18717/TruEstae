The user enters a given keyword  (for example: “organic”).

The frontend sends this keyword to the backend using an API request.

The backend compares the keyword with the Tags column of each row.

If the keyword is found inside the Tags text → the row is kept.

Rows that do not contain the keyword are removed.

The final filtered records are returned to the frontend