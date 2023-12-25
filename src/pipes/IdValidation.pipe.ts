import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValidId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidId) {
      throw new HttpException('Invalid ID format', 400);
    }

    return value;
  }
}
