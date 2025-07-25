import { Button, Tooltip } from "@mantine/core";

export default function PasteButton({
  onPasteClicked,
  tooltip = "Paste lyrics",
}: {
  tooltip?: string;
  onPasteClicked: (pasteText: string) => void;
}) {
  return (
    <Tooltip label={tooltip}>
      <Button
        onClick={() => {
          navigator.clipboard.readText().then((text) => {
            onPasteClicked(text);
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          id="Copy-Paste--Streamline-Core"
          height="14"
          width="14"
        >
          <desc>Copy Paste Streamline Icon: https://streamlinehq.com</desc>
          <g id="copy-paste--clipboard-copy-cut-paste">
            <path
              id="Vector"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.5 3.5v-1c0 -0.26522 -0.10536 -0.51957 -0.29289 -0.70711C8.01957 1.60536 7.76522 1.5 7.5 1.5h-1"
              strokeWidth="1"
            ></path>
            <path
              id="Vector_2"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 10.5H1.5c-0.26522 0 -0.51957 -0.1054 -0.707107 -0.2929C0.605357 10.0196 0.5 9.76522 0.5 9.5v-7c0 -0.26522 0.105357 -0.51957 0.292893 -0.70711C0.98043 1.60536 1.23478 1.5 1.5 1.5h1"
              strokeWidth="1"
            ></path>
            <path
              id="Vector_3"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.5 5.5h-5c-0.55228 0 -1 0.44772 -1 1v6c0 0.5523 0.44772 1 1 1h5c0.5523 0 1 -0.4477 1 -1v-6c0 -0.55228 -0.4477 -1 -1 -1Z"
              strokeWidth="1"
            ></path>
            <path
              id="Vector_4"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 0.5h-4.5l0.41 1.62c0.02498 0.10843 0.08611 0.20513 0.17335 0.27419 0.08724 0.06906 0.19538 0.10638 0.30665 0.10581h2.72c0.11127 0.00057 0.21941 -0.03675 0.30665 -0.10581 0.08724 -0.06906 0.14837 -0.16576 0.17335 -0.27419L6.75 0.5Z"
              strokeWidth="1"
            ></path>
            <path
              id="Vector_5"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.5 8.5h3"
              strokeWidth="1"
            ></path>
            <path
              id="Vector_6"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.5 10.5h3"
              strokeWidth="1"
            ></path>
          </g>
        </svg>
      </Button>
    </Tooltip>
  );
}
