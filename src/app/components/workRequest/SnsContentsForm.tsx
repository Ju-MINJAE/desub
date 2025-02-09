import Script from 'next/script';

const SnsContentsForm = () => {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/w8652A?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="2344"
        title="콘텐츠(sns contents)"
      />
      <Script id="tally-snsContents">
        {`
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
          `}
      </Script>
    </>
  );
};

export default SnsContentsForm;
