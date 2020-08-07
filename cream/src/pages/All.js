import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CreamService from "../services/CreamService";
import MaterialTable from "material-table";
import "./All.css";

class Creams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creams: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {}

  fetchProducts() {
    CreamService.getAllCreams()
      .then((data) => {
        this.setState({
          creams: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h1 className="display-4" style={{ textAlign: "center", margin: "20px", marginTop: "30px" }}>
          Cream Company
        </h1>
        <div style={{ maxWidth: "70%",   margin: "auto" }}>
          <MaterialTable
            title="Cream Table"
            columns={[
              {
                title: "Cream ID",
                field: "cream_id",
                type: "numeric",
                editable: "onAdd",
              },
              {
                title: "Cream Type",
                field: "cream_type",
                type: "string",
                editable: "onAdd",
              },
              { title: "Quantity (ml)", field: "qty", type: "numeric" },
            ]}
            data={this.state.creams.map((cream) => cream)}
            editable={{
              onRowAdd: (newData) =>{
                return new Promise((resolve, reject) => {
                  CreamService.addCream(
                    newData.cream_id,
                    newData.cream_type,
                    newData.qty
                  ).then(() => {
                    this.fetchProducts();
                  });
                  setTimeout(resolve, 1000);
                });
              },
              onRowUpdate: (newData, oldData) => {
                return new Promise((resolve, reject) => {
                  CreamService.updateQuantity(
                    oldData.cream_id,
                    oldData.cream_type,
                    newData.qty
                  ).then(() => {
                    this.fetchProducts();
                  });
                  setTimeout(resolve, 1000);
                });
              },
            }}

            //commenting following function as onRowUpdate seems to be doing a better job
            // celleditable={{
            //   onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            //     return new Promise((resolve, reject) => {
            //       CreamService.updateQuantity(
            //         rowData.cream_id,
            //         rowData.cream_type,
            //         newValue
            //       ).then(() => {
            //         this.fetchProducts();
            //       });
            //       setTimeout(resolve, 1000);
            //     });
            //   },
            // }}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Creams);
