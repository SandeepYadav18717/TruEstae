function DataTable({ data }) {
  return (
    <div style={{ margin: "20px", overflowX: "auto" }}>
      <table
        border="1"
        cellPadding="8"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          minWidth: "900px",
        }}
      >
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Region</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>Tags</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row["Customer Name"]}</td>
              <td>{row["Customer Region"]}</td>
              <td>{row["Gender"]}</td>
              <td>{row["Age"]}</td>
              <td>{row["Product Category"]}</td>
              <td>{row["Product Name"]}</td>
              <td>{row["Tags"]}</td>
              <td>{row["Payment Method"]}</td>
              <td>{row["Date"]}</td>
              <td>{row["Amount"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
