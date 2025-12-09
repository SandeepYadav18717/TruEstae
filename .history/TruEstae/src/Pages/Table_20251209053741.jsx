import "../Styles/Table.css";

function Table({ data }) {
  return (
    <div className="table">
      <table >
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Customer Region</th>
            <th>Customer Type</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Product Category</th>
            <th>Tags</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Discount Percentage</th>
            <th>Total Amount</th>
            <th>Final Amount</th>
            <th>Payment Method</th>
            <th>Order Status</th>
            <th>Delivery Type</th>
            <th>Store ID</th>
            <th>Store Location</th>
            <th>Salesperson ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row["Transaction ID"]}</td>
              <td>{row["Date"]}</td>
              <td>{row["Customer ID"]}</td>
              <td>{row["Customer Name"]}</td>
              <td>{row["Phone Number"]}</td>
              <td>{row["Gender"]}</td>
              <td>{row["Age"]}</td>
              <td>{row["Customer Region"]}</td>
              <td>{row["Customer Type"]}</td>
              <td>{row["Product ID"]}</td>
              <td>{row["Product Name"]}</td>
              <td>{row["Brand"]}</td>
              <td>{row["Product Category"]}</td>
              <td>{row["Tags"]}</td>
              <td>{row["Quantity"]}</td>
              <td>{row["Price per Unit"]}</td>
              <td>{row["Discount Percentage"]}</td>
              <td>{row["Total Amount"]}</td>
              <td>{row["Final Amount"]}</td>
              <td>{row["Payment Method"]}</td>
              <td>{row["Order Status"]}</td>
              <td>{row["Delivery Type"]}</td>
              <td>{row["Store ID"]}</td>
              <td>{row["Store Location"]}</td>
              <td>{row["Salesperson ID"]}</td>
              <td>{row["Employee Name"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
