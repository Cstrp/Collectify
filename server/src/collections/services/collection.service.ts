import { PrismaService } from '../../modules/database/services';
import { CreateCollectionDto } from '../dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../modules';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  public async getCollections() {
    try {
      return await this.prisma.collection.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      throw new HttpException(
        'Error while getting collections',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getCollectionById(id: string, userId: string) {
    return await this.prisma.collection.findFirst({
      where: { id, userId },
      include: { items: true },
    });
  }

  public async create(req: Request, collection: CreateCollectionDto) {
    const user = req.user as User;

    return await this.prisma.collection.create({
      data: {
        ...collection,
        userId: user.id,
        fields: collection.fields,
      },
    });
  }

  public async update(id: string, collection: CreateCollectionDto) {
    return await this.prisma.collection.update({
      where: { id },
      data: {
        ...collection,
        fields: {
          set: collection.fields,
        },
      },
    });
  }

  public async deleteCollection(id: string) {
    return await this.prisma.collection.delete({ where: { id } });
  }
}
