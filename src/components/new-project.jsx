import Input from "./ui/input";
import { useRef } from "react";
import Modal from "./ui/modal";
import Button from "./ui/button";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSaveProject() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // --- validation ---
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal
        ref={modal}
        className="backdrop:bg-stone-900/90 mt-60 mx-auto w-[50%] rounded-md shdow-md px-4 py-5"
      >
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-700">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value</p>
        <form method="dialog" className="mt-2 text-right">
          <Button>Close</Button>
        </form>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button onClick={onCancel} className="text-stone-800 hover:text-stone-950">
              cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSaveProject}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              save
            </button>
          </li>
        </menu>

        <div>
          {/* ref seperti ini berfungsi di react 19.0 or higher */}
          {/* jika dibawahnya maka harus dibungkus dengan menggunakan forwardRef */}
          <Input type="text" label="Title" ref={title} />
          <Input label="Description" ref={description} textarea />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
      </div>
    </>
  );
}
