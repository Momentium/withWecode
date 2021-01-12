import React, { useState, useEffect } from 'react';
import FooterP from './FooterP';

const FooterC = () => {
  const snsLink = {
    instagram: "",
    facebook: "",
  }

  return (
    <>
      <FooterP snsLink={snsLink}/>
    </>
  );
};
export default FooterC;
