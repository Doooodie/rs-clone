export type MainDrive = {
  name: string;
  files: File[];
  folders: File[];
};

export type File = {
  name: string;
  owner: string;
  lastChange: string;
  size: string;
  id: number;
};

export type TrashDrive = {
  name: string;
  files: File[];
};

export type ImportantDrive = {
  name: string;
  files: File[];
  folders: File[];
};

export type StorageDrive = {
  name: string;
  files: File[];
  folders: File[];
};

export type AllDrive = {
  drive: MainDrive;
  trash: TrashDrive;
  important: ImportantDrive;
  storage: StorageDrive;
};
