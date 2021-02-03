export const dataURLtoFile = (dataurl, fileName) => {
  try{
    const _dataUrl = dataurl
    let arr = _dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
  }
  catch(err){
    return dataurl
  }
}