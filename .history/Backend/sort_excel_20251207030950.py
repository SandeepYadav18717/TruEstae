import pandas as pd

# --------------------------- READ BIG CSV FILE ---------------------------
# Supports 1 crore rows with chunk processing
file_path = r"C:\Users\Administrator\OneDrive\Documents\resumes for companies\New folder\Backend\truestate_assignment_dataset.csv"

chunksize = 200000   # read 2 lakh rows at a time (fast + memory safe)
chunks = pd.read_csv(file_path, chunksize=chunksize)

filtered_data = []


# --------------------------- FILTERING PHASE ---------------------------
search_text = ""            # example: "john"
filter_region = ""          # example: "North"

for chunk in chunks:

    # Filter by region
    if filter_region:
        chunk = chunk[chunk["Region"].str.contains(filter_region, case=False, na=False)]

    # Search everywhere
    if search_text:
        chunk = chunk[chunk.apply(lambda row: search_text.lower() in str(row).lower(), axis=1)]

    filtered_data.append(chunk)


# Combine filtered rows
df = pd.concat(filtered_data)

print(f"Total Filtered Rows: {len(df)}")


# --------------------------- REDUCE SIZE FOR DSA ---------------------------
# reduce data to manageable size for bubble sort
df_small = df.head(1000)   # bubble sort works best under 1000 rows


# Convert dataframe to list of dictionaries
data_list = df_small.to_dict(orient="records")


# --------------------------- BUBBLE SORT FUNCTION ---------------------------
def bubble_sort(data, key):
    n = len(data)
    for i in range(n):
        for j in range(0, n - i - 1):
            try:
                if str(data[j][key]) > str(data[j + 1][key]):
                    data[j], data[j + 1] = data[j + 1], data[j]
            except KeyError:
                print(f"Column '{key}' not found!")
                return data
    return data


# --------------------------- SORT USING YOUR DSA ---------------------------
sort_column = "Customer Name"  # change this anytime (Age, Amount etc.)

sorted_data = bubble_sort(data_list, sort_column)


# --------------------------- PRINT SORTED RESULTS ---------------------------
print("\n---- SORTED OUTPUT ----\n")
for row in sorted_data:
    print(row)
