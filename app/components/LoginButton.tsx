import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

const UserIcon = ({ picture }: { picture?: string | null }) => {
  if (picture) {
    return (
      <button className="btn btn-xs btn-ghost">
        <img
          src={picture}
          width={24}
          height={24}
          alt="User profile icon"
          style={{ borderRadius: "50%" }}
        />
      </button>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={`stroke-primary`}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

function LoginButtonForUser({ user }: { user?: UserProfile }) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost text-info stroke-primary"
      >
        {user ? (
          <UserIcon picture={user?.picture} />
        ) : (
          <div className="indicator">
            <span className="indicator-item badge badge-xs badge-primary"></span>
            <UserIcon />
          </div>
        )}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact p-2 bg-base-100 shadow-xl"
      >
        {!user && (
          <ul className="menu menu-md bg-base-100 w-56">
            <li>
              <a href="/api/auth/login">Kirjaudu</a>
            </li>
          </ul>
        )}
        {user && (
          <ul className="menu menu-md bg-base-100 w-56">
            <li>
              <span className="font-bold">{user.email}</span>
            </li>
            <li>
              <a href="/api/auth/logout">Kirjaudu ulos</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default function LoginButton() {
  const { user } = useUser();

  return <LoginButtonForUser user={user} />;
}
