@app.post("/get-data")
def get_data(filters: Recive_data):
    temp = df.copy()

    # Filter by correct column names
    if filters.region:
        temp = temp[temp["Customer Region"] == filters.region]

    if filters.gender:
        temp = temp[temp["Gender"] == filters.gender]

    if filters.age:
        temp = temp[temp["Age"].astype(str) == filters.age]

    if filters.category:
        temp = temp[temp["Product Category"] == filters.category]

    if filters.tags:
        temp = temp[temp["Tags"].str.contains(filters.tags, na=False)]

    if filters.payment:
        temp = temp[temp["Payment Method"] == filters.payment]

    if filters.date:
        temp = temp[temp["Date"] == filters.date]

    # -------- SORTING --------
    if filters.sortBy:
        arr = temp.to_dict("records")

        if filters.sortBy == "name-asc":
            arr = merge_sort(arr, "Customer Name")

        elif filters.sortBy == "name-desc":
            arr = merge_sort(arr, "Customer Name")[::-1]

        elif filters.sortBy == "newest":
            arr = merge_sort(arr, "Date")[::-1]

        elif filters.sortBy == "oldest":
            arr = merge_sort(arr, "Date")

        temp = pd.DataFrame(arr)

    # return top 10 rows
    return temp.head(10).to_dict(orient="records")
