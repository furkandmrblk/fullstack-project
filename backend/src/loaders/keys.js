import { randomBytes } from 'crypto';

// Here we're regularly generating random secret keys

const accesskey = randomBytes(32).toString('hex');
const refreshkey = randomBytes(32).toString('hex');

console.table({ accesskey, refreshkey });
