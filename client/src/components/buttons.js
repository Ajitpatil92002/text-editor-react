import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { GrBlockQuote } from "react-icons/gr";
import { BsJustify, BsJustifyLeft, BsJustifyRight } from "react-icons/bs";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

const FeatureButtons = [
  { id: 1, icon: AiOutlineUndo, cmd: "undo", value: null },
  { id: 2, icon: AiOutlineRedo, cmd: "redo", value: null },
  { id: 3, icon: FaBold, cmd: "bold", value: null },
  { id: 4, icon: FaItalic, cmd: "italic", value: null },
  { id: 5, icon: FaUnderline, cmd: "underline", value: null },
  { id: 6, icon: FaStrikethrough, cmd: "strikeThrough", value: null },
  { id: 7, icon: null, cmd: "formatBlock", value: "H1" },
  { id: 8, icon: null, cmd: "formatBlock", value: "H2" },
  { id: 9, icon: null, cmd: "formatBlock", value: "H3" },
  { id: 10, icon: null, cmd: "formatBlock", value: "H4" },
  { id: 11, icon: GrBlockQuote, cmd: "formatBlock", value: "blockquote" },
  { id: 12, icon: GoListUnordered, cmd: "insertUnorderedList", value: null },
  { id: 13, icon: GoListOrdered, cmd: "insertOrderedList", value: null },
  { id: 14, icon: BsJustifyLeft, cmd: "justifyLeft", value: null },
  { id: 15, icon: BsJustify, cmd: "justifyCenter", value: null },
  { id: 16, icon: BsJustifyRight, cmd: "justifyRight", value: null },
];

export default FeatureButtons;
