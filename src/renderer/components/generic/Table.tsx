import { Fragment, ReactNode } from "react";

/**
 * Type that the id type of the table must extend
 */
type TableType = string | number;

/**
 * Function Component for the table column renderer
 */
export type TableColumnRenderer<T extends TableType> = (id: T) => ReactNode;


/**
 * Type for a table column
 */
export interface TableColumn<T extends TableType> {


  /**
   * The column's label
   */
  readonly label: string;

  /**
   * The column's width
   */
  readonly width?: `${number}rem`;

  /**
   * The column's component
   */
  readonly renderer: TableColumnRenderer<T>;

}



/**
 * Props for the table component
 */
export interface TableProps<T extends TableType> {

  /**
   * The data for the table
   */
  readonly ids: T[];


  /**
   * The columns for the table
   */
  readonly columns: TableColumn<T>[];
}



/**
 * Component for a table in the application
 */
export function Table<T extends TableType>({
  ids,
  columns
}: TableProps<T>) {




  return (

    <div id="Table" className="h-full w-full overflow-auto border">

      {/** Internal Table */}
      <div
        className="min-w-full grid"
        style={{
          gridTemplateColumns: columns.map((col) => col.width ?? "minmax(min-content, 1fr)").join(" "),
        }}>

        {/** Table Header */}
        {columns.map((col, colIndex) => (
          <Fragment key={colIndex}>
            <div className="border-b bg-white px-1 py-0.5 font-medium sticky top-0 text-nowrap">
              {col.label}
            </div>
          </Fragment>
        ))}


        {/** Rows */}
        {ids.map((id) => (
          <Fragment key={`r-${id}`}>

            {/** Cells */}
            {columns.map((col, colIndex) => (
              <Fragment key={`c-${colIndex}`}>
                <div className="px-1 py-0.5 text-nowrap truncate">
                  {col.renderer(id)}
                </div>
              </Fragment>
            ))}
          </Fragment>
        ))}

      </div>
    </div>
  )
}