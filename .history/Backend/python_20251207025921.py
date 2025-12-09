import pandas as pd
import json

# Load Excel file
df = pd.read_excel("..")

# ------- FUNCTION: Filter + Search + Sort -------
def filter_data(search="", region="", sortBy="CustomerName"):

    temp = df.copy()

    # Filter by region
    if region:
        temp = temp[temp["Region"] == region]

    # Search everything
    if search:
        temp = temp[temp.apply(lambda row: search.lower() in str(row).lower(), axis=1)]

    # Sort
    temp = temp.sort_values(by=sortBy)

    # Return only 10 rows
    result = temp.head(10).to_dict(orient="records")

    # Save JSON for React
    with open("../frontend/public/output.json", "w") as f:
        json.dump(result, f, indent=4)

    print("Data processed ✔ output.json updated!")

# ------- RUN SCRIPT (EXAMPLE) -------
filter_data(search="john", region="North", sortBy="Age")
