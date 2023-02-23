export type MyFile = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
};

export type MyFolder = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
  files: MyFile[];
  children: MyFolder[];
  parent: number;
};

export type MainDrive = {
  name: string;
  files: MyFile[];
  folders: MyFile[];
};

export type TrashDrive = {
  name: string;
  files: MyFile[];
  folders: MyFile[];
};

export type ImportantDrive = {
  name: string;
  files: MyFile[];
  folders: MyFile[];
};

export type AllDrive = {
  drive: MainDrive;
  trash: TrashDrive;
  important: ImportantDrive;
};

export type Coordinate = {
  xCoordinate: number;
  yCoordinate: number;
};

export type FileProps = {
  file: MyFile;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isFile: boolean;
};

export type RenameFileType = {
  contextId: number;
  folderNewName: string;
};

export type FileApi = {
  name: string;
  size: number;
  info?: string;
  filePath: string;
  type: string;
};

