import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
	private products: Product[] = [];

	constructor(
		@InjectModel('Product') private readonly productModel: Model<Product>
	) {}

	async insertProduct(title: string, description: string, price: number) {
		const product = new this.productModel({ title, description, price });
		const result = await product.save();
		return result._id as string;
	}

	async getAllProducts() {
		const products = await this.productModel.find();
		const productsQuantity = await this.productModel.find().countDocuments();
		return {
			status: `There are ${productsQuantity} products`,
			products: products,
		};
	}

	async getSingleProduct(prodId: string) {
		const product = await this.findProduct(prodId);
		return product;
	}

	async updateProduct(
		prodId: string,
		title: string,
		desc: string,
		price: number
	) {
		const product = await this.findProduct(prodId);
		if (title) {
			product.title = title;
		}
		if (desc) {
			product.description = desc;
		}
		if (price) {
			product.price = price;
		}
		const result = await product.save();
		return result;
	}

	async deleteProduct(prodId: string): Promise<{ status: string }> {
		const product = await this.findProduct(prodId);
		await this.productModel.findByIdAndDelete(prodId);
		return { status: `Product ${product.id} has been successfully deleted` };
	}

	private async findProduct(id: string) {
		const product = await this.productModel.findById(id);
		if (!product) {
			throw new NotFoundException('Could not find product');
		}
		return product;
	}
}
