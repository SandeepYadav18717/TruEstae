from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("truestate_assignment_dataset.csv")


# ---------------- FILTER MODEL ----------------
class Recive_daya(BaseModel):
    region: str | None = None
    gender: str | None = None
    age: str | None = None
    category: str | None = None
    tags: str | None = None
    payment: str | None = None
    date: str | None = None
    sortBy: str | None = None


# ---------------- MERGE SORT ----------------
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
        if str(left[i][key]) <= str(right[j][key]):
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


# ---------------- API: FILTER + SORT ----------------
@app.post("/get-data")
def get_data(filters: Filters):
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

    # Sorting
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
