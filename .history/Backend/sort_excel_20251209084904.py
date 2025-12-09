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
    page: int = 1
    limit: int = 20


# ====================================================================
#               NAME / PHONE SEARCH (PAGINATED)
# ====================================================================
@app.post("/search-name-phone")
def search_name_phone(data: SearchQuery):
    print("SEARCH API CALLED")

    q = str(data.query).strip().lower()
    print("QUERY RECEIVED:", q)

    names = df["Customer Name"].astype(str).str.strip().str.lower()
    phones = df["Phone Number"].astype(str).str.strip()

    result = df[
        names.str.contains(q, na=False) |
        phones.str.contains(q, na=False)
    ]

    total_count = len(result)
    print("FOUND ROWS:", total_count)

    # PAGINATION
    start = (data.page - 1) * data.limit
    end = start + data.limit

    paginated_result = result.iloc[start:end]

    return {
        "total": total_count,
        "page": data.page,
        "limit": data.limit,
        "data": paginated_result.to_dict(orient="records")
    }


# ====================================================================
#                FILTER + SORT
# ====================================================================
@app.post("/get-data")
def get_data(filters: Recive_data):
    temp = df.copy()

    if filters.region:
        temp = temp[temp["Customer Region"] == filters.region]

    if filters.gender:
        temp = temp[temp["Gender"] == filters.gender]

    if filters.age:
        if filters.age == "18-25":
            temp = temp[(temp["Age"] >= 18) & (temp["Age"] <= 25)]
        elif filters.age == "26-35":
            temp = temp[(temp["Age"] >= 26) & (temp["Age"] <= 35)]
        elif filters.age == "36-50":
            temp = temp[(temp["Age"] >= 36) & (temp["Age"] <= 50)]
        elif filters.age == "50+":
            temp = temp[temp["Age"] >= 50]

    if filters.category:
        temp = temp[temp["Product Category"] == filters.category]

    if filters.tags:
        temp = temp[temp["Tags"].str.contains(filters.tags, na=False)]

    if filters.payment:
        temp = temp[temp["Payment Method"] == filters.payment]

    if filters.date:
        temp = temp[temp["Date"] == filters.date]

    # PAGINATION
    start = (filters.page - 1) * filters.limit
    end = start + filters.limit

    paginated_data = temp.iloc[start:end]

    return paginated_data.to_dict(orient="records")
