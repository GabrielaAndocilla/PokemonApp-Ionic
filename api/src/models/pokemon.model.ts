import { RowDataPacket } from "mysql2";

export default interface Pokemon extends RowDataPacket {
  id?: number;
  name?: string;
  height?: number;
}
