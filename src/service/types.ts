export enum DocumentStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  FINISHED = 'finished',
  FAILED = 'failed',
  DELETING = 'deleting',
  DELETED = 'deleted',
  DELETE_FAILED = 'delete_failed',
}

export interface DocumentData {
  documentId: string;
  fileName: string;
  size: number;
  status: DocumentStatus;
  mimetype: string;
  createdAt?: string;
  deletedAt?: number;
  purgeAt?: number;
}

export interface UsersData {
  userName: string;
  password: string;
}
