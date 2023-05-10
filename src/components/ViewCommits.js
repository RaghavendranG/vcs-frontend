import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import "../styles/cssFiles/ViewCommits.css";
const ViewCommits = () => {
  const { id } = useParams();
  const [historyArray, setHistoryArray] = useState([]);
  const [localTime, setLocalTime] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retriveAllData();
  }, []);

  const retriveAllData = async () => {
    try {
      const res = await fetch(`https://vcs-backend.vercel.app/${id}`, {
        method: "GET",
      });
      const response = await res.json();
      const responseHistory = response.history;
      setHistoryArray(responseHistory);
    } catch (error) {
      console.log(error);
      swal("error retriving data");
    }
  };

  return (
    <div className="container-lg viewCommit">
      <div className="row">
        {historyArray.commits}
        {historyArray.map((value, index) => {
          var responseTime = value.commitedat;
          var time = new Date(responseTime);
          var localTime = new Date(
            time.getTime() + time.getTimezoneOffset() * 60000
          ).toString();
          return (
            <div className="col-md-12 commits " key={index}>
              <div>
                <u>
                  <h3>Commits :</h3>
                </u>
                <div className="content"> {value.content}</div>
              </div>
              <hr />
              <div>
                <span>
                  <b>
                    {" "}
                    CommitedBy:{" "}
                    <span className="biggerFont">{value.commitedby}</span>{" "}
                  </b>
                </span>
                @
                <span className="localTime">
                  <u> {localTime}</u>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="commitBtn">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => navigate("/homepage")}
        >
          Navigate Back To Home
        </button>
      </div>
    </div>
  );
};
export default ViewCommits;
