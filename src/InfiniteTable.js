import React, { useState } from "react";
import {
  Table,
  Column,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import "react-virtualized/styles.css";

function InfiniteTable({
  /** List of items loaded so far */
  list,
  /** Callback function responsible for loading the next page of items */
  loadNextPage
}) {
  // Keep track of pageNumber in our state (using the State Hook)
  const [pageNumber, setPageNumber] = useState(1);

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
              >
                <Column
                  label=""
                  dataKey="picture"
                  width={100}
                  cellRenderer={getImageColumn}
                />
                <Column
                  label="First Name"
                  dataKey="first"
                  width={150}
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.name[dataKey]
                  }
                />
                <Column
                  label="Last Name"
                  dataKey="last"
                  width={150}
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.name[dataKey]
                  }
                />
                <Column label="E.mail" dataKey="email" width={300} />
                <Column
                  label="City"
                  dataKey="city"
                  width={150}
                  cellDataGetter={({ dataKey, rowData }) =>
                    rowData.location[dataKey]
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
