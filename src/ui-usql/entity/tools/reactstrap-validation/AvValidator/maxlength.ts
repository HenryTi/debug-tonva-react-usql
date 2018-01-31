import { toNumber } from 'lodash';
import { isEmpty } from './utils';

export default function validate(value, context, constraint:any = {}) {
  if (isEmpty(value)) return true;

  const length = value.length;

  return length <= toNumber(constraint.value) || constraint.errorMessage || false;
}
