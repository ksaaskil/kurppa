export default function InfoDialog() {
  return (
    <dialog id="info" className="modal">
      <div className="modal-box min-h-96 w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="prose">
          <h2 className="font-bold text-lg">Mikä Kurppa?</h2>
          <p>Kurppa on järjestelmä lintuhavaintojen tallentamiseen.</p>
          <p>
            Kurppa on avointa lähdekoodia ja koodi löytyy kokonaisuudessaan
            osoitteesta{" "}
            <a target="_blank" href="https://github.com/ksaaskil/kurppa">
              github.com/ksaaskil/kurppa
            </a>
            .
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
