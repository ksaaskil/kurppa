import { useUser } from "@auth0/nextjs-auth0/client";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

export default function LoginButton() {
  const { user } = useUser();

  if (user) {
    return (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost text-info"
        >
          <UserIcon />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content p-1 z-[1] menu shadow bg-base-100"
        >
          <li>
            <a href="/api/auth/logout">Kirjaudu ulos</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <a href="/api/auth/login">
      <button className="btn btn-primary btn-sm">Kirjaudu</button>
    </a>
  );
}
