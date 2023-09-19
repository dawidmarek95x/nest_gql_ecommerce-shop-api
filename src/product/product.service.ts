import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createOne(createProductInput: CreateProductInput) {
    const product = new Product();

    product.name = createProductInput.name;
    product.category = createProductInput.category;
    product.price = createProductInput.price;
    product.description = createProductInput.description;
    product.image = createProductInput.image;

    const currentDate = new Date();
    product.createdAt = currentDate;
    product.updatedAt = currentDate;

    return await this.prisma.product.create({
      data: product,
    });
  }

  getAll() {
    return this.prisma.product.findMany();
  }

  getOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async updateOne(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.getOne(id);

    if (product.name) {
      product.name = updateProductInput.name;
    }

    if (product.category) {
      product.category = updateProductInput.category;
    }

    if (product.description) {
      product.description = updateProductInput.description;
    }

    if (product.price || product.price === 0) {
      product.price = updateProductInput.price;
    }

    if (product.image) {
      product.image = updateProductInput.image;
    }

    const currentDate = new Date();
    product.updatedAt = currentDate;

    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  deleteOne(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
