/**
 * ResponseEnvelope are common response for every http request. It use chainable api
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Meta {
  @ApiProperty()
  code: string;
  @ApiProperty()
  message: string;
  @ApiPropertyOptional()
  errorMessage?: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  withErrMsg(val: string): Meta {
    this.errorMessage = val;
    return this;
  }
}

export class ResponseEnvelope {
  @ApiProperty()
  data: any;
  @ApiProperty()
  meta: Meta;
  constructor(code: string, message: string) {
    this.meta = new Meta(code, message);
  }

  withData(data: any): ResponseEnvelope {
    this.data = data;
    return this;
  }

  withErrMsg(val: string): ResponseEnvelope {
    this.meta.withErrMsg(val);
    return this;
  }
}
