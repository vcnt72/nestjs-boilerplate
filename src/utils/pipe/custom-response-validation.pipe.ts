import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseCode } from '../response/response-code';
import { ResponseEnvelope } from '../response/response-envelope';

@Injectable()
export class CustomResponseValidationPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          new ResponseEnvelope(ResponseCode.BAD_REQUEST, error.message),
        );
      }
    }
  }
}
