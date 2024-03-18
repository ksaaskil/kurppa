export default function Instructions() {
  return (
    <div className="card card-bordered w-96 shadow-xl border-primary">
      <div className="card-body flex flex-row text-center">
        <div className="grow">
          <p>1. Paina mikrofonikuvaketta</p>
          <p>2. Sano rauhallisesti {`"kolme varista"`}</p>
          <p>3. Lopeta nauhoitus painamalla kuvaketta</p>
        </div>
      </div>
    </div>
  );
}
