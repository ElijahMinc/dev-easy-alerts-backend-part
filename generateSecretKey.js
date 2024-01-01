const crypto = require( 'crypto')

function generateSecretKey(){
   const randomBytes = crypto.randomBytes(32);
   const randomKey = randomBytes.toString('hex');
   
   return randomKey
}

console.log('generated Secret Key', generateSecretKey())