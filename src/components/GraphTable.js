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

  render() {
    const { graphData = [] } = this.props;
    const { page, rowsPerPage } = this.state;
    const values = graphData.map(item => item.values)
    const dates = graphData.map(item => item.dates)[0] || []

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
            {dates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((date, index) =>
              <TableRow key={date}>
                <TableCell component="th" scope="row">
                  {new Date(date).toLocaleDateString()}
                </TableCell>
                {
                  graphData.map((item, typeIndex) =>
                    <TableCell key={typeIndex} component="th" scope="row">
                      {`${values[typeIndex][index].toPrecision(4)}%`}
                    </TableCell>
                  )
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dates.length}
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