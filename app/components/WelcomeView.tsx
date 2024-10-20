import { useEffect, useState } from "react";
import Logo from "../resources/kurppa.png";
import Image from "next/image";

const WELCOME_VIEW_VISIBLE_MS = 2000;

export default function WelcomeView() {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), WELCOME_VIEW_VISIBLE_MS);
  });

  return (
    <>
      {isVisible && (
        <div
          className="h-screen
            w-screen
            absolute
            bg-base-100
            top-0
            left-0
            z-50
            flex
            justify-center
            items-center
        "
        >
          <div className="w-48">
            <Image src={Logo} width={1024} height={1024} alt="Kurppa logo" />
            <div className="prose text-center">
              <h2 className="font-bold">Kurppa</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
