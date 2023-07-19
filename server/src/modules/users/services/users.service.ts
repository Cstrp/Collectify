import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/services';
import { User } from '../dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public async create(data: User) {
    return await this.prisma.user.create({ data });
  }

  public async findOneById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async findOneByUsername(username: string) {
    return await this.prisma.user.findFirst({ where: { username } });
  }

  public async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  public async findOneAndUpdate(id: string, data: User) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  public async findOneAndDelete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
