import Script from 'next/script';

const EditingForm = () => {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/3qJeg2?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="2344"
        title="영상편집(edting)"
      />
      <Script id="tally-editing">
        {`
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
          `}
      </Script>
    </>
  );
};

export default EditingForm;
