import React from "react";
import { Card, Table, Button } from "react-bootstrap";

const TransactionDetails = (props: any) => {
  const { details } = props;
  console.log(details);
  return !details ? (
    <></>
  ) : (
    <Card className="mt-5">
      <Card.Header>Transaction Details</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sequence</th>
              <th>addr</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {details.map((data: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{data.sequence}</td>
                  <td>{data.prev_out.addr}</td>
                  <td>{data.prev_out.value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TransactionDetails;
