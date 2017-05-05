export class DirectoryEntry {
  Id: number;
  TypeId: DirectoryEntryType;
  TypeDescription: string;
  Name: string;
  IsExpanded: boolean;
  IsActive: boolean;
}

export enum DirectoryEntryType {
  Folder = 1,
  File = 2
}

export class MockFirstFolder extends DirectoryEntry {
  Id = 1;
  TypeId = DirectoryEntryType.Folder;
  TypeDescription = "Folder";
  Name = "First Folder";
}

export class MockTextFile extends DirectoryEntry {
  Id = 2;
  TypeId = DirectoryEntryType.File;
  TypeDescription = "File";
  Name = "Text File2.txt";
}
