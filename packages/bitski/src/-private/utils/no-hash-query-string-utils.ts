import { BasicQueryStringUtils, LocationLike, StringMap } from '@openid/appauth';

export class NoHashQueryStringUtils extends BasicQueryStringUtils {
  public parse(input: LocationLike): StringMap {
    return super.parse(input, false);
  }
}
