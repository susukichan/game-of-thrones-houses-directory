import "./loading-style.css";

export const Loading = (): JSX.Element => (
  <div className="loading-screen">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);
