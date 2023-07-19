import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../modules/database/services';
import { CollectionItemsDto } from '../dto';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { User } from '../../../shared';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  public async getItems() {
    return await this.prisma.collectionItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  public async getItem(id: string) {
    return await this.prisma.collectionItem.findUnique({ where: { id } });
  }

  public async createItem(collectionId: string, dto: CollectionItemsDto) {
    const collection = await this.prisma.collection.findUniqueOrThrow({
      where: { id: collectionId },
      select: { fields: true },
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    const collectionFields = [
      ...(collection.fields ?? []),
      ...(dto.fields ?? []),
    ];

    const data: Prisma.CollectionItemCreateInput = {
      ...dto,
      fields: {
        set: collectionFields,
      },
      collection: { connect: { id: collectionId } },
      comments: {},
      likes: {},
    };

    return await this.prisma.collectionItem.create({ data });
  }

  public async updateItem(id: string, dto: CollectionItemsDto) {
    const updateItem = await this.prisma.collectionItem.update({
      where: { id },
      data: {
        ...dto,
        fields: {
          set: dto.fields,
        },
        comments: {},
        likes: {},
      },
    });

    if (!updateItem) {
      throw new NotFoundException('Item not found');
    }

    return updateItem;
  }

  public async deleteItem(id: string) {
    const item = await this.prisma.collectionItem.delete({
      where: { id },
      include: { comments: true, likes: true, collection: true },
    });

    if (!item) throw new NotFoundException('Item not found');
  }

  public async createComment(itemId: string, content: string, req: Request) {
    const user = req.user as User;
    const item = await this.prisma.collectionItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return await this.prisma.comments.create({
      data: { content, collectionItemId: itemId, userId: user.id },
    });
  }

  public async updateComment(id: string, content: string) {
    const comment = await this.prisma.comments.findUniqueOrThrow({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return await this.prisma.comments.update({
      where: { id },
      data: { content },
    });
  }

  public async deleteComment(id: string) {
    const comment = await this.prisma.comments.findUniqueOrThrow({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return await this.prisma.comments.delete({ where: { id } });
  }

  public async addLike(itemId: string, req: Request) {
    const user = req.user as User;
    const item = await this.prisma.collectionItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return await this.prisma.likes.create({
      data: {
        userId: user.id,
        collectionItemId: itemId,
      },
    });
  }

  public async removeLike(id: string) {
    return await this.prisma.likes.delete({ where: { id } });
  }
}
