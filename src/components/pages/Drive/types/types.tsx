export type MyFile = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
};

export type Coordinate = {
  mouseX: number;
  mouseY: number;
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
