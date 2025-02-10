import React, { useEffect, useRef } from 'react';

interface FormConfig {
  query: string;
  id: string;
}

const Workform = ({ formConfig, formName }: { formConfig: FormConfig; formName: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const tallyUrl = `https://tally.so/embed/${formConfig.query}`;
      iframeRef.current.src = tallyUrl;
    }
  }, [formConfig]);

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={`https://tally.so/embed/${formConfig.query}`}
      loading="lazy"
      width="100%"
      height="2344"
      title={formName}
      style={{ border: 'none' }}
    />
  );
};

export default Workform;
