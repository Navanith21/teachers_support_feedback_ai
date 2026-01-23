import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const goDashboard = () => navigate("/dashboard");
  const goSidebarWrite = () => navigate("/write");
  const goSidebarView = () => navigate("/view");
  const goLessonPlanner = () => navigate("/lesson-planner");
  const goHomework = () => navigate("/homework");


  // 🔒 PROTECT DASHBOARD + GET USERNAME
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("username");

    if (!isLoggedIn) {
      navigate("/");
    } else {
      setUserName(storedUser);
    }
  }, [navigate]);

  // 🚪 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  // 👉 WRITE / VIEW NAVIGATION (CORRECT PLACE)
  const goWrite = () => navigate("/write");
  const goView = () => navigate("/view");

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">TeachAI</div>

          <nav>
            <a className="active" onClick={goDashboard}>Dashboard</a>
            <a onClick={goSidebarWrite}>Write Notes</a>
            <a onClick={goSidebarView}>View Notes</a>
            <a onClick={goLessonPlanner}>Lesson Planner</a>
            <a onClick={goHomework}>Homework Analysis</a>

          </nav>


        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Welcome, {userName}</h2>
          <div className="profile">👤</div>
        </header>

        <div className="dashboard-content">
          <section className="classes">
            <div className="class-card">
              <h3>BIAT</h3>
              <p>1st Year</p>
              <div className="actions">
                <button className="btn-light" onClick={goWrite}>
                  Write
                </button>
                <button className="btn-primary" onClick={goView}>
                  View
                </button>
              </div>
            </div>

            <div className="class-card">
              <h3>2nd Year</h3>
              <p>1st Year</p>
              <div className="actions">
                <button className="btn-light" onClick={goWrite}>
                  Write
                </button>
                <button className="btn-primary" onClick={goView}>
                  View
                </button>
              </div>
            </div>

            <div className="class-card">
              <h3>Udavi</h3>
              <p>11th Std</p>
              <div className="actions">
                <button className="btn-light" onClick={goWrite}>
                  Write
                </button>
                <button className="btn-primary" onClick={goView}>
                  View
                </button>
              </div>
            </div>

            <div className="class-card">
              <h3>6th</h3>
              <div className="actions">
                <button className="btn-light" onClick={goWrite}>
                  Write
                </button>
                <button className="btn-primary" onClick={goView}>
                  View
                </button>
              </div>
            </div>
          </section>

          <section className="tools">
            <h3>AI-Powered Tools</h3>
            <div className="tool-card blue">📘 AI Lesson Planner</div>
            <div className="tool-card purple">📊 Homework Analysis</div>
            <div className="tool-card green">📚 Lesson Planner</div>
            <div className="tool-card orange">👥 Student Progress</div>
          </section>
        </div>
      </main>
    </div>
  );
}
