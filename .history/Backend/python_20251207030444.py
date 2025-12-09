import pandas as pd

# ---- READ EXCEL / CSV FILE ----
df = pd.read_csv(r"C:\Users\Administrator\OneDrive\Documents\resumes for companies\New folder\Backend\truestate_assignment_dataset.csv")

# Convert DataFrame to list of dictionaries
data = df.to_dict(orient="records")


# ------------------ BUBBLE SORT FUNCTION ------------------
def bubble_sort(data, key):
    n = len(data)
    for i in range(n):
        for j in range(0, n - i - 1):

            # Compare values or convert to string to avoid errors
            if str(data[j][key]) > str(data[j + 1][key]):
                data[j], data[j + 1] = data[j + 1], data[j]

    return data


# ------------------ APPLY SORTING ------------------
# EXAMPLE: sort by "Customer Name", "Age", "Transaction Amount"
sort_column = "Customer Name"    # <-- CHANGE THIS WHEN YOU WANT

sorted_data = bubble_sort(data, sort_column)


# ------------------ PRINT ALL SORTED DETAILS ------------------
print("\n---- SORTED DATA ----\n")
for row in sorted_data:
    print(row)
