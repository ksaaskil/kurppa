import LoginButton from "./LoginButton";
import Logo from "../resources/kurppa.png";
import Image from "next/image";
import MapButton from "./MapButton";
import ProcessingStatusButton from "./ProcessingStatusButton";
import { ProcessingStatus } from "../hooks/useProcessing";

export default function NavBar({
  toggleMap,
  processingStatus,
}: {
  toggleMap: () => void;
  processingStatus: ProcessingStatus;
}) {
  function openInfo() {
    (document.getElementById("info") as any)?.showModal();
  }

  return (
    <div className="navbar bg-transparent">
      <div className="flex-1">
        <button className="btn btn-square btn-ghost" onClick={openInfo}>
          <Image src={Logo} width={50} height={50} alt="Kurppa logo" />
        </button>
      </div>
      <div className="flex-none">
        <ProcessingStatusButton status={processingStatus} />
      </div>
      <div className="flex-none">
        <MapButton toggleMap={toggleMap} />
      </div>
      <div className="ml-2 flex-none">
        <LoginButton />
      </div>
    </div>
  );
}
