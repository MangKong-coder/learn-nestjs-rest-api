import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): { greet: string } {
		return { greet: 'Hi daddy ;)' };
	}
}
