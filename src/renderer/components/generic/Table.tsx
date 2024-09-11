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
    <div className="w-full h-full overflow-y-auto border">
      <table className="border-collapse">

        {/** table header */}
        <thead className="sticky top-0 bg-white after:border-b after:absolute after:inset-0">
          <tr>
            {columns.map((col, colIndex) => (
              <Fragment key={colIndex}>
                <th
                  // className={`w-[${col.width}]`}
                  style={{ width: col.width }}
                  key={colIndex}>
                  {col.label}
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>


        {/** Table Body */}
        <tbody>
          {ids.map((id) => (
            <tr key={id}>
              {columns.map((col, colIndex) => (
                <Fragment key={colIndex}>
                  <td>{col.renderer(id)}</td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  )
}