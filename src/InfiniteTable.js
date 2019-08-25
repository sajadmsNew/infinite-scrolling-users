import React, {useState} from "react";
import { Table, Column, AutoSizer, List, InfiniteLoader } from "react-virtualized";
import "react-virtualized/styles.css";

function InfiniteTable({
  /** List of items loaded so far */
  list,
  /** Callback function responsible for loading the next page of items */
  loadNextPage
}) {


  const [pageNumber, setPageNumber] = useState(1);

  const loadMoreRows = () => {
    let newPageNumber = pageNumber + 1
    loadNextPage(newPageNumber)
    setPageNumber(newPageNumber)
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
                <Column label="First Name" dataKey="first" width={250} cellDataGetter={({dataKey, rowData})=>rowData.name[dataKey]} />
                <Column label="Last Name" dataKey="last" width={250} cellDataGetter={({dataKey, rowData})=>rowData.name[dataKey]} />
                <Column label="E.mail" dataKey="email" width={300} />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default InfiniteTable;
