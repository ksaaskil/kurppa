import { useEffect, useState } from "react";

const EXAMPLES = [
  "kolme varista",
  "viisitoista kiurua",
  "varpunen",
  "kaksi kottaraista",
]

export default function Instructions() {

  const [example, setExample] = useState("");

  useEffect(() => {
    setExample(EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)])
  }, [])

  return (
    <>
    { example && (<div className="card card-bordered w-full shadow-xl border-primary">
      <div className="card-body flex flex-row text-center">
        <div className="grow prose text-xs lg:text-base">
          <span>1. Paina mikrofonikuvaketta</span>
          <br />
          <span>2. Sano esimerkiksi {`"${example}"`}</span>
          <br />
          <span>3. Lopeta nauhoitus painamalla kuvaketta</span>
        </div>
      </div>
    </div>) }
    </>
  );
}
