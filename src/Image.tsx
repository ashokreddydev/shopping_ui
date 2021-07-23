import React from 'react';

const Image = (data: any) => {
    var whereFrom = data.src.substring(0, 8);
    if (whereFrom === 'https://') {
        return <img src={data.src} alt={data.alt} width={data.width} height={data.height} className={data.className}></img>
    } else {
        return <img src={require('./' + data.src)} alt={data.alt} width={data.width} height={data.height} className={data.className}></img>
    }
}
 
export default Image;