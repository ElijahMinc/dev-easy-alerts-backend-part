const generateRandomPassword = () => {
   const min = 10000;
   const max = 99999;
   return Math.floor(Math.random() * (max - min + 1)) + min;
 };


 console.log('generated Random Password', generateRandomPassword())