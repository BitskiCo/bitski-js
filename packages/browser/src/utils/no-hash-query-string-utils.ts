import {
  BasicQueryStringUtils,
  LocationLike,
  StringMap,
} from '@openid/appauth';

export class NoHashQueryStringUtils extends BasicQueryStringUtils {
  public parse(input: LocationLike, useHash?: boolean): StringMap {
    return super.parse(input, false /* never use hash */);
  }
}
