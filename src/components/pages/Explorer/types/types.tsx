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

export type StorageDrive = {
  name: string;
  files: MyFile[];
  folders: MyFile[];
};

export type AllDrive = {
  drive: MainDrive;
  trash: TrashDrive;
  important: ImportantDrive;
  storage: StorageDrive;
};

export type Coordinate = {
  xCoordinate: number;
  yCoordinate: number;
};

export type FileProps = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
  onContextMenu: (value: any) => void;
  isFile: boolean;
};
