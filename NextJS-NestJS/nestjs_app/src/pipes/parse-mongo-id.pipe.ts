import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        if (!isValidObjectId(value)) {
            throw new BadRequestException(`ID '${value}' không phải là một MongoDB ObjectId hợp lệ!`);
        }
        return value;
    }
}
