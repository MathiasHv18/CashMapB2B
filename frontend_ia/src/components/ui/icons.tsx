// Centralised SVG icon library.
// Each icon follows the same size contract: inherits color via `currentColor`
// and renders at w-5 h-5 by default. Pass a className prop to override.

export const IconMoney = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1
         14.93V18h-2v-1.07C9.39 16.57 8 15.4 8 13.5c0-.83.67-1.5 1.5-1.5s1.5.67
         1.5 1.5c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5 0-1.9-1.39-3.07-3-3.43V9H8V7h2V5.07C11.61
         5.43 13 6.6 13 8.5c0 .83-.67 1.5-1.5 1.5S10 9.33 10 8.5c0-.28-.22-.5-.5-.5h-1c-.28
         0-.5.22-.5.5 0 1.9 1.39 3.07 3 3.43V14h2v2h-2z"
    />
  </svg>
);

export const IconChart = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="22 12 18 12 15 21 9 3 6 12 2 12"
    />
  </svg>
);

export const IconBolt = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
    />
  </svg>
);

export const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="22,6 12,13 2,6"
    />
  </svg>
);

export const IconLock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      ry="2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 11V7a5 5 0 0 1 10 0v4"
    />
  </svg>
);

interface IconEyeProps {
  open: boolean;
}

export const IconEye = ({ open }: IconEyeProps) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1
           5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0
           1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
      />
      <line strokeLinecap="round" x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
    />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconCalendar = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
    />
    <line strokeLinecap="round" x1="16" y1="2" x2="16" y2="6" />
    <line strokeLinecap="round" x1="8" y1="2" x2="8" y2="6" />
    <line strokeLinecap="round" x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconChevronDown = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="6 9 12 15 18 9"
    />
  </svg>
);

// ── Navigation icons ───────────────────────────────────────────────────────────

export const IconGrid = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
    />
  </svg>
);

export const IconShoppingCart = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
    />
  </svg>
);

export const IconReceipt = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="14 2 14 8 20 8"
    />
    <line strokeLinecap="round" x1="16" y1="13" x2="8" y2="13" />
    <line strokeLinecap="round" x1="16" y1="17" x2="8" y2="17" />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="10 9 9 9 8 9"
    />
  </svg>
);

export const IconPackage = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <line strokeLinecap="round" x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="3.27 6.96 12 12.01 20.73 6.96"
    />
    <line strokeLinecap="round" x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ── Action icons ───────────────────────────────────────────────────────────────

export const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <line strokeLinecap="round" x1="12" y1="5" x2="12" y2="19" />
    <line strokeLinecap="round" x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconSearch = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="11" cy="11" r="8" />
    <line strokeLinecap="round" x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IconArrowLeft = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <line strokeLinecap="round" x1="19" y1="12" x2="5" y2="12" />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="12 19 5 12 12 5"
    />
  </svg>
);

export const IconCheck = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="20 6 9 17 4 12"
    />
  </svg>
);

export const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <line strokeLinecap="round" x1="18" y1="6" x2="6" y2="18" />
    <line strokeLinecap="round" x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconMoreHorizontal = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="19" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const IconChevronUp = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="18 15 12 9 6 15"
    />
  </svg>
);

// ── Financial icons ────────────────────────────────────────────────────────────

export const IconWallet = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16v4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 12a2 2 0 0 1-2 2h-3a2 2 0 0 1 0-4h3a2 2 0 0 1 2 2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6V4a2 2 0 0 1 2-2h14"
    />
  </svg>
);

export const IconSmartphone = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="5"
      y="2"
      width="14"
      height="20"
      rx="2"
      ry="2"
    />
    <line strokeLinecap="round" x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

export const IconCreditCard = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="1"
      y="4"
      width="22"
      height="16"
      rx="2"
      ry="2"
    />
    <line strokeLinecap="round" x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const IconTrendingUp = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="23 6 13.5 15.5 8.5 10.5 1 18"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="17 6 23 6 23 12"
    />
  </svg>
);

export const IconTrendingDown = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="23 18 13.5 8.5 8.5 13.5 1 6"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="17 18 23 18 23 12"
    />
  </svg>
);

export const IconBanknote = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      x="2"
      y="6"
      width="20"
      height="12"
      rx="2"
    />
    <circle cx="12" cy="12" r="2" />
    <path strokeLinecap="round" d="M6 12h.01M18 12h.01" />
  </svg>
);

// ── Item type icons ────────────────────────────────────────────────────────────

export const IconTag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
    />
    <line strokeLinecap="round" x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export const IconScissors = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line strokeLinecap="round" x1="20" y1="4" x2="8.12" y2="15.88" />
    <line strokeLinecap="round" x1="14.47" y1="14.48" x2="20" y2="20" />
    <line strokeLinecap="round" x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export const IconStore = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="9 22 9 12 15 12 15 22"
    />
  </svg>
);

export const IconFileText = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="14 2 14 8 20 8"
    />
    <line strokeLinecap="round" x1="16" y1="13" x2="8" y2="13" />
    <line strokeLinecap="round" x1="16" y1="17" x2="8" y2="17" />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="10 9 9 9 8 9"
    />
  </svg>
);

// ── Feedback icons ─────────────────────────────────────────────────────────────

export const IconCheckCircle = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="22 4 12 14.01 9 11.01"
    />
  </svg>
);

export const IconAlertCircle = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="12" cy="12" r="10" />
    <line strokeLinecap="round" x1="12" y1="8" x2="12" y2="12" />
    <line strokeLinecap="round" x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const IconInfo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="12" cy="12" r="10" />
    <line strokeLinecap="round" x1="12" y1="16" x2="12" y2="12" />
    <line strokeLinecap="round" x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const IconChevronRight = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="9 18 15 12 9 6"
    />
  </svg>
);
