const {
  generateKeyPairSync,
  sign,
  verify,
} = require('node:crypto');

// 1. Generate an ML-DSA public/private key pair
const { publicKey, privateKey } =
  generateKeyPairSync('ml-dsa-65');

// Message that will be signed
const message = Buffer.from(
  'The British are coming!',
  'utf8'
);

// 2. Sign the message using the private key
// ML-DSA requires the algorithm argument to be null.
const signature = sign(
  null,
  message,
  privateKey
);

console.log(
  'Signature:',
  signature.toString('hex')
);

// 3. Verify the signature using the public key
const isValid = verify(
  null,
  message,
  publicKey,
  signature
);

console.log('Signature valid:', isValid);

// 4. Demonstrate that modifying the message breaks verification
const modifiedMessage = Buffer.from(
  'The British are not coming!',
  'utf8'
);

const modifiedMessageIsValid = verify(
  null,
  modifiedMessage,
  publicKey,
  signature
);

console.log(
  'Modified message valid:',
  modifiedMessageIsValid
);
