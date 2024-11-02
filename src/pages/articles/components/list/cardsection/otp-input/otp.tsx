import React, { ChangeEvent, ClipboardEvent, useRef, useState } from "react";

interface OTPInputProps {
  length: number;
}



const OTPInput: React.FC<OTPInputProps> = ({ length }) => {
  const [inputs, setInputs] = useState(Array(length).fill(""));
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {

   
    const value = event.target.value.replace(/\D/g, "");
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value) {
      if (index < length - 1) inputRef.current[index + 1]?.focus();
      else inputRef.current[index]?.blur();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      const newInputs = [...inputs];
      newInputs[index] = "";
      setInputs(newInputs);

      if (event.key === "Backspace" && index > 0) {
        inputRef.current[index - 1]?.focus();
      } else if (event.key === "Delete" && index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length);
    setInputs(pasteData.split(""));
    inputRef.current[pasteData.length - 1]?.focus();
  };

  return (
    <div style={{ display: "flex", gap: 8 , marginTop : '20px'}}>
      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRef.current[index] = el)}
          maxLength={1}
          style={{ width: 40, height: 40, textAlign: "center" }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
