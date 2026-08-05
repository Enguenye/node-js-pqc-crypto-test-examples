const {
  generateKeyPairSync,
  encapsulate,
  decapsulate,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} = require('node:crypto');

// --------------------------------------------------
// 1. Generate an ML-KEM-768 public/private key pair
// --------------------------------------------------

const { publicKey, privateKey } =
  generateKeyPairSync('ml-kem-768');

// --------------------------------------------------
// 2. Sender encapsulates a shared secret
// --------------------------------------------------

const {
  sharedKey: senderSharedKey,
  ciphertext: kemCiphertext,
} = encapsulate(publicKey);

console.log(
  'ML-KEM ciphertext:',
  kemCiphertext.toString('hex')
);

// --------------------------------------------------
// 3. Receiver recovers the same shared secret
// --------------------------------------------------

const receiverSharedKey = decapsulate(
  privateKey,
  kemCiphertext
);

console.log(
  'Shared keys match:',
  senderSharedKey.equals(receiverSharedKey)
);

// --------------------------------------------------
// 4. Encrypt the actual message using AES-256-GCM
// --------------------------------------------------

const message = 'The British are coming!';
const iv = randomBytes(12);

const cipher = createCipheriv(
  'aes-256-gcm',
  senderSharedKey,
  iv
);

const encryptedMessage = Buffer.concat([
  cipher.update(message, 'utf8'),
  cipher.final(),
]);

const authenticationTag = cipher.getAuthTag();

console.log(
  'Encrypted message:',
  encryptedMessage.toString('hex')
);

// --------------------------------------------------
// 5. Decrypt using the recovered shared secret
// --------------------------------------------------

const decipher = createDecipheriv(
  'aes-256-gcm',
  receiverSharedKey,
  iv
);

decipher.setAuthTag(authenticationTag);

const decryptedMessage = Buffer.concat([
  decipher.update(encryptedMessage),
  decipher.final(),
]);

console.log(
  'Decrypted message:',
  decryptedMessage.toString('utf8')
);
