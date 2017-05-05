import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SecureHttpProvider } from '../providers/http.provider'

import { DirectoryEntry, MockFirstFolder, MockTextFile } from '../domain/directory/directory-entry'

export interface IDirectoryService {
  list(id?: number): Promise<DirectoryEntry[]>;
  create(dir: DirectoryEntry): Promise<DirectoryEntry>;
  update(dir: DirectoryEntry): Promise<DirectoryEntry>;
  content(id: number): Promise<any>;
}

@Injectable()
export class DirectoryService implements IDirectoryService {

  constructor(
    private http: SecureHttpProvider) {
  }

  list(id?: number): Promise<DirectoryEntry[]> {
    return new Promise<DirectoryEntry[]>((resolve, reject) => {
      let obs = (id ? this.http.get('DirectoryEntries/' + id) : this.http.get('DirectoryEntries')).map(this.http.extractData).catch(this.http.parseError);
      obs.subscribe(
        (dirs: DirectoryEntry[]) => resolve(dirs),
        error => reject(error)
      );
    });
  }

  create(dir: DirectoryEntry): Promise<DirectoryEntry> {
    return new Promise<DirectoryEntry>((resolve, reject) => {
      let obs = this.http.post('DirectoryEntries', dir).map(this.http.extractData).catch(this.http.parseError);
      obs.subscribe(
        (directory: DirectoryEntry) => resolve(directory),
        error => reject(error)
      );
    });
  }

  update(dir: DirectoryEntry): Promise<DirectoryEntry> {
    return new Promise<DirectoryEntry>((resolve, reject) => {
      let obs = this.http.put('DirectoryEntries/' + dir.Id, dir).map(this.http.extractData).catch(this.http.parseError);
      obs.subscribe(
        (directory: DirectoryEntry) => resolve(directory),
        error => reject(error)
      );
    });
  }

  content(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let obs = this.http.get('DirectoryEntries/' + id + '/Content').map(this.http.extractText).catch(this.http.parseError);
      obs.subscribe(
        (content: any) => resolve(content),
        error => reject(error)
      );
    });
  }
}

@Injectable()
export class MockDirectoryService extends DirectoryService implements IDirectoryService {

  list(id?: number): Promise<DirectoryEntry[]> {
    let folder = new MockFirstFolder();
    let file = new MockTextFile();
    if (id === folder.Id) {
      return Promise.resolve([file]);
    }
    else {
      return Promise.resolve([folder]);
    }
  }

  create(dir: DirectoryEntry): Promise<DirectoryEntry> {
    return Promise.resolve(dir);
  }

  update(dir: DirectoryEntry): Promise<DirectoryEntry> {
    return Promise.resolve(dir);
  }

  content(id: number): Promise<any> {
    return Promise.resolve('Test File Contents');
  }
}
