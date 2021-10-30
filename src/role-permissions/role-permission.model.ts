// Role Permission Response Model

export interface IRoleRO {
  id: number;
  name: string;
  code: string;
  permissions: IPermissionRO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermissionRO {
  id: number;
  name: string;
  code: string;
  actived: boolean;
  hidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}
