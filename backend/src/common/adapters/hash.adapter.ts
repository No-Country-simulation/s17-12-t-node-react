import * as bcrypt from 'bcrypt';

export class HashAdapter {
  private readonly hashDependency = bcrypt;

  createHash(data: string | Buffer, saltOrRounds: string | number): string {
    return this.hashDependency.hashSync(data, saltOrRounds);
  }

  verifyHash(data: string | Buffer, encrypted: string): boolean {
    return this.hashDependency.compareSync(data, encrypted);
  }
}
