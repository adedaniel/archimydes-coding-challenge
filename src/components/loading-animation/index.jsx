import React from "react";
export default function Loader() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "table-cell",
          verticalAlign: "middle",
          textAlign: "center",
          width: "100vw",
        }}
      >
        <div className="lds-hourglass"></div>
      </div>
      <style jsx>{`
        .lds-hourglass {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-hourglass:after {
          content: " ";
          display: block;
          border-radius: 50%;
          width: 0;
          height: 0;
          margin: 8px;
          box-sizing: border-box;
          border: 32px solid #429e89;
          border-color: #429e89 transparent #429e89 transparent;
          animation: lds-hourglass 1.8s infinite;
        }
        @keyframes lds-hourglass {
          0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          100% {
            transform: rotate(1800deg);
          }
        }
      `}</style>
    </>
  );
}
