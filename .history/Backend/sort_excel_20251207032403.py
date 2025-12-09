import pandas as pd

df = pd.read_csv("truestate_assignment_dataset.csv")

import pandas as pd

# ------------------------------
# STEP 1: LOAD YOUR EXCEL / CSV
# ------------------------------
df = pd.read_csv("your_file.csv")   # change your file name


# ------------------------------
# STEP 2: MERGE SORT (DSA)
# ------------------------------
def merge_sort(arr, key):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid], key)
    right = merge_sort(arr[mid:], key)
    
    return merge(left, right, key)


def merge(left, right, key):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i][key] <= right[j][key]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result


# ------------------------------
# STEP 3: SORT FULL DATASET
# ------------------------------
def sort_full_dataset(column_name):
    arr = df.to_dict("records")  # DF → list of dicts
    sorted_arr = merge_sort(arr, column_name)
    return pd.DataFrame(sorted_arr)  # back to DataFrame


# ------------------------------
# STEP 4: PAGINATION (10 per page)
# ------------------------------
def paginate(dataframe, page, limit=10):
    start = (page - 1) * limit
    end = start + limit
    return dataframe.iloc[start:end]


# ------------------------------
# STEP 5: FULL PIPELINE RUN
# ------------------------------
if __name__ == "__main__":
    # CHANGE COLUMN NAME TO SORT
    column_to_sort = "Age"

    # Sort the entire file
    sorted_df = sort_full_dataset(column_to_sort)

    # Show first page
    page_number = 1
    page_data = paginate(sorted_df, page=page_number)

    print("\n===== PAGE 1 (10 records) =====\n")
    print(page_data)

