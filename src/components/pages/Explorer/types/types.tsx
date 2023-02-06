export type MyFile = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
};

export type MainDrive = {
  name: string;
  files: MyFile[];
  folders: MyFile[];
};

export type TrashDrive = {
  name: string;
  files: MyFile[];
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
