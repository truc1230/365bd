export interface TypePerson {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}
export interface TCell {
  accessor: string;
  header: string;
  isRight?: boolean;
  render?: (values: any) => React.ReactElement;
}
export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  aligh: "center" | "right" | "left" | "inherit" | "justify" | undefined;
}

export interface PersonTableProps {
  listPerson: TypePerson[];
  selected: any[];
  setSelected: Function;
  handleClickUpdatePerson: any;
}
