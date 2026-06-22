import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (

    <div
      style={{
        background:"#2c3e50",
        color:"white",
        padding:"15px 30px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        boxShadow:"0 2px 8px rgba(0,0,0,0.2)"
      }}
    >

      <h2
        style={{
          margin:0
        }}
      >
        Smart Job Portal 🚀
      </h2>

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"10px"
        }}
      >

        {user ? (

          <>

            <span
              style={{
                fontWeight:"bold",
                color:"#ecf0f1"
              }}
            >
              <div
  style={{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-end"
  }}
>

  <span
    style={{
      fontWeight:"bold"
    }}
  >
    Welcome, {user.name}
  </span>

  <span
    style={{
      fontSize:"12px",
      background:
        user.role === "ADMIN"
          ? "#e74c3c"
          : "#27ae60",
      padding:"3px 8px",
      borderRadius:"10px",
      marginTop:"3px"
    }}
  >
    {user.role}
  </span>

</div>
            </span>

            <button
              style={{
                background:"#e74c3c",
                color:"white",
                border:"none",
                padding:"8px 15px",
                borderRadius:"5px",
                cursor:"pointer"
              }}
              onClick={logout}
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <button
              style={{
                padding:"8px 15px",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer"
              }}
              onClick={()=>navigate("/login")}
            >
              Login
            </button>

            <button
              style={{
                padding:"8px 15px",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer",
                background:"#3498db",
                color:"white"
              }}
              onClick={()=>navigate("/register")}
            >
              Register
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default Navbar;