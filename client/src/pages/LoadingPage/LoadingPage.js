// CSS
import "./LoadingPage.css";

// Redux
import { useSelector } from "react-redux";

export function LoadingPage() {
  const { isLoading, msg } = useSelector((state) => state.loading);

  return (
    <>
      {isLoading ? (
        <div className="LoadingPage">
          <div className="loadingContainer">
            <div className="loadingCircle flex">
              <div className="innerCircle"></div>
            </div>
            <div className="msg">{msg}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
