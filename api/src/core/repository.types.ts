export interface IRepository<T> {
  findAll(options?: any): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
