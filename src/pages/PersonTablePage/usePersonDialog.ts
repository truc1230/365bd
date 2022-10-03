import { TypePerson } from "@types";
import { useEffect, useState } from "react";

export const usePersonModal = () => {
  const [isShowModalPerson, setIsShowModalPerson] = useState(false as boolean);
  const [typePerson, setTypePerson] = useState("add" as "add" | "update");

  const [valuesPerson, setvaluesPerson] = useState({} as TypePerson);

  function setModalPerson(type: "add" | "update", values: TypePerson) {
    setIsShowModalPerson(true);
    setTypePerson(type);
    setvaluesPerson(values);
  }

  return {
    isShowModalPerson,
    typePerson,
    valuesPerson,
    setModalPerson,
    setIsShowModalPerson,
  };
};
