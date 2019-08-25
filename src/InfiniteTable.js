import React, { useState } from "react";
import {
  Table,
  Column,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import _ from "lodash";
import "react-virtualized/styles.css";

function InfiniteTable({
  /** List of items loaded so far */
  list,
  /** Callback function responsible for loading the next page of items */
  loadNextPage
}) {
  // Keep track of pageNumber, sortBy and sortDirection in our state (using the State Hook)
  // TODO: re-evaluate this, may be cleaner to convert to Class and use setState() depending on state updates
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('dataKey');
  const [sortDirection, setSortDirection] = useState('ASC');

  // Executes callback method responsible for requesting more user data
  const loadMoreRows = () => {
    let newPageNumber = pageNumber + 1;
    loadNextPage(newPageNumber);
    setPageNumber(newPageNumber);
  };

  // Returns status message when no rows are rendered
  const onNoRowsRendered = () => {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  };

  // Takes the image source data from column data and returns an image element
  const getImageColumn = ({ cellData, dataKey }) => {
    return (
      <div>
        <img src={cellData.thumbnail} />
      </div>
    );
  };

  /**
   * 
   */
  const sortColumn = ({ sortBy, sortDirection }) => {
    setSortBy(sortBy)
    setSortDirection(sortDirection)

    list.sort(function(a, b) {
      // Using lodash's get() to allow using sortBy which can be a nested object property string like ('name.last') or ('location.city')
      var strA = _.get(a, sortBy); 
      var strB = _.get(b, sortBy);

      // Compare strings and take into account the sortDirection
      if (strA < strB) {
        return sortDirection === "ASC" ? 1 : -1;
      }
      if (strA > strB) {
        return sortDirection === "ASC" ? -1 : 1;
      }
    
      // strings must be equal
      return 0;
    })
  }


  return (
    <div>
      <h3>Page count: {pageNumber}</h3>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!list[index]}
        loadMoreRows={loadMoreRows}
        rowCount={1000000}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <Table
                noRowsRenderer={onNoRowsRendered}
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowClassName="table-row"
                headerHeight={40}
                width={width}
                height={500}
                rowHeight={40}
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
                sort={sortColumn}
                sortBy={sortBy}
                sortDirection={sortDirection}
              >
                <Column
                  label=""
                  dataKey="picture"
                  width={100}
                  disableSort
                  cellRenderer={getImageColumn}
                />
                <Column
                  label="First Name"
                  dataKey="name.first"
                  width={150}
                  defaultSortDirection="ASC"
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.name.first
                  }
                />
                <Column
                  label="Last Name"
                  dataKey="name.last"
                  width={150}
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.name.last
                  }
                />
                <Column label="E.mail" dataKey="email" width={300} />
                <Column
                  label="City"
                  dataKey="location.city"
                  width={150}
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.location.city
                  }
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default InfiniteTable;
