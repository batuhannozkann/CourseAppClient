export const sliceText=(text:string,characterLimit:number)=>
{
    if (text.length > characterLimit) {
        return text.slice(0, characterLimit) + '...';
      }
      return text;
}