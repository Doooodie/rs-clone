type MyFile = {
  id: number;
  name: string;
  size: number;
  info: string;
  filePath: string;
  parentPath: string;
  type: 'file' | 'folder';
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

type Coordinate = {
  mouseX: number;
  mouseY: number;
};

export type { MyFile, Coordinate };
