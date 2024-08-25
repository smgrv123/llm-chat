'use client';

function OnboardingForm({ createMessage }: { createMessage: (formData: FormData) => void }) {
  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <div>
        <span>Name</span>
        <input placeholder="Enter your name..." type="text" name="userName" />
      </div>
      <div>
        <span>OpenAI Key</span>
        <input placeholder="Enter your key..." type="text" name="llmKey" />
      </div>
      <button>submit</button>
    </form>
  );
}

export default OnboardingForm;
