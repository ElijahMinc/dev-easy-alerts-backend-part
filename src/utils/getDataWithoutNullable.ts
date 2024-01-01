export const getDataWithoutNullable = (data: any) => {
   let newObj = {};
   Object.entries(data).map(([key, value]) => ({
      key,
      value
   }))
   .filter(obj => Boolean(obj.value))
   .forEach(({key, value}) => {
      newObj[key] = value
   })

   return newObj
}