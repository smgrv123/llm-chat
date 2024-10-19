'use client';

export default function DeleteAcc() {
  return (
    <button
      className="bg-red-800 mt-5 p-4 rounded-md"
      onClick={async () => {
        const response = confirm('Are you sure you want to delete your accout');
        if (response) {
        } else {
        }
      }}
    >
      Delete Account
    </button>
  );
}
