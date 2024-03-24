export default function Instructions() {
  return (
    <div className="card card-bordered w-96 shadow-xl border-primary">
      <div className="card-body flex flex-row text-center">
        <div className="grow prose">
          <span>1. Paina mikrofonikuvaketta</span>
          <br />
          <span>2. Sano rauhallisesti {`"kolme varista"`}</span>
          <br />
          <span>3. Lopeta nauhoitus painamalla kuvaketta</span>
        </div>
      </div>
    </div>
  );
}
