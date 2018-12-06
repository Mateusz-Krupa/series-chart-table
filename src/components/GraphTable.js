import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class GraphTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      rowsPerPage: 10,
    }
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //would be nice to put it in a webworker 
  createRows(dates, graphData, values, min, max){
    const rows = []
    dates.map((date, index) => {
      const row = []
      row.push(new Date(date).toLocaleDateString())
      graphData.forEach((item, typeIndex) => {
          const value = values[typeIndex][index];
          if((!min || value > min) && (!max || value < max)){
            row.push(`${value && value.toPrecision(4)}%`)
          }
        }
      )
      rows.push(row);
    })
    return rows;
  }

  render() {
    const { graphData = [], min, max} = this.props;
    const { page, rowsPerPage } = this.state;
    const values = graphData.map(item => item.values)
    const dates = graphData.map(item => item.dates)[0] || []
    const rows = this.createRows(dates, graphData, values, min, max).filter(item => item.length > 1) || []
      return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {graphData.map(item => <TableCell key={item.name}> {item.name} </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
              <TableRow key={row[0]}>
              {row.map((item, index) => 
                <TableCell key={index} component="th" scope="row">
                  {item}
                </TableCell>
              )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

GraphTable.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GraphTable