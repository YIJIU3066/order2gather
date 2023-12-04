import React, { useState, useEffect } from 'react';

const Base64ImageConverter = ({ base64Image }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // 將Base64編碼的圖片轉換為byte
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // 創建Blob並生成URL
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    // 設定圖片URL
    setImageSrc(imageUrl);

    // 清理生成的URL
    return () => URL.revokeObjectURL(imageUrl);
  }, [base64Image]);

  return (
    <div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt='Converted from Base64'
          style={{ maxWidth: '100%' }}
        />
      )}
    </div>
  );
};

export default Base64ImageConverter;
