// UserProfile Component (with getServerSideProps)
import Profile from "@components/Profile";

const UserProfile = ({ userName, userPosts }) => {
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

// Fetch user data on the server before rendering
export async function getServerSideProps(context) {
  const { id } = context.params;
  const userName = context.query.name;

  // Fetch posts from the API
  const response = await fetch(`https://your-api.com/api/users/${id}/posts`);
  const userPosts = await response.json();

  return {
    props: {
      userName,
      userPosts,
    },
  };
}

export default UserProfile;