import Script from 'next/script';

const CharacterForm = () => {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/n9R5aG?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="2344"
        title="캐릭터디자인(character)"
      />
      <Script id="tally-character">
        {`
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
          `}
      </Script>
    </>
  );
};

export default CharacterForm;
