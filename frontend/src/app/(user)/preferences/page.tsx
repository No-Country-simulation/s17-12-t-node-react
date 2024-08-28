import PreferencesForm from "@/components/PreferencesForm";

export default function PreferencesPage() {
  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col justify-center">
      <h2 className="p-1 absolute top-0 text-base w-full bg-gray-300 text-center">Tus intereses</h2>
      <PreferencesForm />
    </div>
  );
}