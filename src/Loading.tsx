import "./loading-style.css";

const Loading = (): JSX.Element => (
  <div className="loading-screen">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);
export default Loading;
