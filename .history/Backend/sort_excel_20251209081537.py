from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV
df = pd.read_csv("truestate_assignment_dataset.csv")


# ---------------- FILTER MODEL ----------------
class Recive_data(BaseModel):
    region: str | None = None
    gender: str | None = None
    age: str | None = None
    category: str | None = None
    tags: str | None = None
    payment: str | None = None
    date: str | None = None
    sortBy: str | None = None
    page: int = 1
    limit: int = 10



# ---------------- SEARCH MODEL ----------------
class SearchQuery(BaseModel):
    query: str








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
        if str(left[i][key]).casefold() <= str(right[j][key]).casefold():
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result



# ====================================================================
#               NAME / PHONE SEARCH
# ====================================================================




# ====================================================================
#                FILTER + SORT
# ====================================================================
@app.post("/get-data")
def get_data(filters: Recive_data):
    temp = df.copy()

    # -------- REGION --------
    if filters.region:
        temp = temp[temp["Customer Region"] == filters.region]

    # -------- GENDER --------
    if filters.gender:
        temp = temp[temp["Gender"] == filters.gender]

    # -------- AGE RANGE --------
    if filters.age:
        if filters.age == "18-25":
            temp = temp[(temp["Age"] >= 18) & (temp["Age"] <= 25)]
        elif filters.age == "26-35":
            temp = temp[(temp["Age"] >= 26) & (temp["Age"] <= 35)]
        elif filters.age == "36-50":
            temp = temp[(temp["Age"] >= 36) & (temp["Age"] <= 50)]
        elif filters.age == "50+":
            temp = temp[temp["Age"] >= 50]

    # -------- CATEGORY --------
    if filters.category:
        temp = temp[temp["Product Category"] == filters.category]

    # -------- TAGS --------
    if filters.tags:
        temp = temp[temp["Tags"].str.contains(filters.tags, na=False)]

    # -------- PAYMENT METHOD --------
    if filters.payment:
        temp = temp[temp["Payment Method"] == filters.payment]

    # -------- DATE --------
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

    # -------- PAGINATION --------
    start = (filters.page - 1) * filters.limit
    end = start + filters.limit

    paginated_data = temp.iloc[start:end]

    return paginated_data.to_dict(orient="records")
