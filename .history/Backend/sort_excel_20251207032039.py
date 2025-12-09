import pandas as pd

df = pd.read_csv("truestate_assignment_dataset.csv")

sorted_df = df.sort_values(by="Price", ascending=False)
