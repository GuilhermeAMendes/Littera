import { PrismaClient } from "../../../../../generated/prisma";

export class PrismaORM {
  private static instance: PrismaClient;

  private constructor() {}

  private static getInstance() {
    if (this.instance == null) this.instance = new PrismaClient();
    return this.instance;
  }
}
