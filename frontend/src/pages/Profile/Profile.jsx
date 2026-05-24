import "./Profile.css";

function Profile() {

  const profile = {
    username: "Cinta Melati",
    email: "cinta@gmail.com",
    bio: "Mahasiswa Sistem Informasi yang sedang belajar Fullstack Developer 🚀",
    profile_picture: "https://i.pravatar.cc/300"
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <img
            src={profile.profile_picture}
            alt="Profile"
            className="profile-image"
          />

          <h1>{profile.username}</h1>

          <p className="profile-email">
            {profile.email}
          </p>

        </div>

        <div className="profile-body">

          <div className="profile-box">

            <h3>About Me</h3>

            <p>
              {profile.bio}
            </p>

          </div>

          <div className="profile-stats">

            <div className="stats-card">
              <h2>12</h2>
              <p>Budget</p>
            </div>

            <div className="stats-card">
              <h2>5</h2>
              <p>Category</p>
            </div>

            <div className="stats-card">
              <h2>89%</h2>
              <p>Saving</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;