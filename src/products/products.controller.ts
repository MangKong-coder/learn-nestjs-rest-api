import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Patch,
	Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	async addProduct(
		@Body('title') prodTitle: string,
		@Body('description') prodDesc: string,
		@Body('price') prodPrice: number
	) {
		const generatedId = await this.productsService.insertProduct(
			prodTitle,
			prodDesc,
			prodPrice
		);
		return { id: generatedId };
	}

	@Get()
	getProducts() {
		return this.productsService.getAllProducts();
	}

	@Get(':id')
	getProduct(@Param('id') prodId: string) {
		return this.productsService.getSingleProduct(prodId);
	}

	@Patch(':id')
	async updateProduct(
		@Param('id') prodId: string,
		@Body('title') prodTitle: string,
		@Body('description') prodDesc: string,
		@Body('price') prodPrice: number
	) {
		const update = await this.productsService.updateProduct(
			prodId,
			prodTitle,
			prodDesc,
			prodPrice
		);
		return update;
	}

	@Delete(':id')
	async deleteProduct(@Param('id') prodId: string) {
		const result = await this.productsService.deleteProduct(prodId);
		return result;
	}
}
