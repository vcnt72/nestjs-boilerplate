/**
 * ResponseEnvelope are common response for every http request. It use chainable api
 */

export class ResponseEnvelope {
  data: any;
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

class Meta {
  code: string;
  message: string;
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
