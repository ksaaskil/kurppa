import { useEffect, useState } from "react";

const EXAMPLES = [
  "kolme varista",
  "viisitoista kiurua",
  "varpunen",
  "kaksi kottaraista",
];

const useUserAgent = () => {
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    const usesSafari =
      (navigator.vendor.match(/apple/i) &&
        !navigator.userAgent.match(/crios/i) &&
        !navigator.userAgent.match(/fxios/i) &&
        !navigator.userAgent.match(/Opera|OPT\//)) ||
      false;
    setSafari(usesSafari);
  }, []);

  return { isSafari: safari };
};

export default function Instructions() {
  const [example, setExample] = useState("");

  useEffect(() => {
    setExample(EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]);
  }, []);

  const { isSafari } = useUserAgent();

  return (
    <>
      {example && (
        <div className="card card-bordered w-full shadow-xl border-primary">
          <div className="card-body flex flex-col text-center">
            {isSafari && (
              <span>
                <span className="font-bold">
                  HUOM! Safari ei kuulu tuettuihin selaimiin.
                </span>
                <br />
                <span className="font-bold">
                  Kurppa toimii parhaiten Firefoxilla ja Chromella.
                </span>
              </span>
            )}
            <div className="grow prose text-xs lg:text-base">
              <span>1. Paina mikrofonikuvaketta</span>
              <br />
              <span>2. Sano esimerkiksi {`"${example}"`}</span>
              <br />
              <span>3. Lopeta nauhoitus painamalla kuvaketta</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
